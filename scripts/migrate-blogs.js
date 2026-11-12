y
                    tags: blog.tags || [],
                    is_enabled: true,
                    display_order: blogs.indexOf(blog),
                    updated_at: new Date().toISOString()
                };
                
                // Check if blog exists
                const { data: existing, error: checkError } = await supabase
                    .from('blogs')
                    .select('id')
                    .eq('slug', blog.slug)
                    .maybeSingle();
                
                if (checkError && checkError.code !== 'PGRST116') {
                    console.error(`⚠️ Check error for ${blog.title}:`, checkError.message);
                }
                
                if (existing && existing.id) {
                    // Update existing
                    const { error } = await supabase
                        .from('blogs')
                        .update(blogData)
                        .eq('id', existing.id);
                    
                    if (error) throw error;
                    console.log(`✅ Updated: ${blog.title}`);
                } else {
                    // Insert new
                    const { error } = await supabase
                        .from('blogs')
                        .insert([{
                            ...blogData,
                            created_at: new Date().toISOString()
                        }]);
                    
                    if (error) throw error;
                    console.log(`✅ Inserted: ${blog.title}`);
                }
                
                successCount++;
                
            } catch (error) {
                errorCount++;
                console.error(`❌ Error migrating blog "${blog.title}":`, error.message);
            }
        }
        
        console.log(`\n📊 Migration Summary:`);
        console.log(`   ✅ Success: ${successCount} blogs`);
        console.log(`   ❌ Errors: ${errorCount} blogs`);
        console.log('🎉 Blog migration completed!');
        
    } catch (error) {
        console.error('❌ Fatal Error:', error.message);
        process.exit(1);
    }
}

migrateBlogs();