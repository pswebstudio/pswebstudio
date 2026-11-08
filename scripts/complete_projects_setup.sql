-- ==============================================================================
-- PS Web Studio: projects table creation, RLS security policies, and indexes
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    client TEXT,
    industry TEXT,
    type TEXT,
    timeline TEXT,
    team TEXT,
    status TEXT DEFAULT 'Live',
    year TEXT,
    features TEXT[] DEFAULT '{}',
    tech_stack JSONB DEFAULT '{}'::jsonb,
    images TEXT[] DEFAULT '{}',
    scope JSONB DEFAULT '{}'::jsonb,
    testimonial TEXT,
    testimonial_author TEXT,
    live_url TEXT,
    slug TEXT UNIQUE,
    is_featured BOOLEAN DEFAULT false,
    is_enabled BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous read access (SELECT) so users can view projects on website
DROP POLICY IF EXISTS "Allow public read access to projects" ON public.projects;
CREATE POLICY "Allow public read access to projects" 
ON public.projects FOR SELECT 
USING (true);

-- Allow authenticated users and service role full CRUD access
DROP POLICY IF EXISTS "Allow full access to authenticated users" ON public.projects;
CREATE POLICY "Allow full access to authenticated users" 
ON public.projects FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Create performance indexes
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON public.projects(display_order);
CREATE INDEX IF NOT EXISTS idx_projects_is_enabled ON public.projects(is_enabled);
CREATE INDEX IF NOT EXISTS idx_projects_is_featured ON public.projects(is_featured);


-- PS Web Studio: projects table, final upgraded data
-- Safe to re-run: each row is an upsert on id. Wrapped in a transaction.
BEGIN;

INSERT INTO public.projects (id, title, description, client, industry, type, timeline, team, status, year, features, tech_stack, images, scope, testimonial, testimonial_author, live_url, slug, is_featured, is_enabled, display_order, created_at, updated_at) VALUES

-- 1. Andaman DMC (reference row; truncated deployment text fixed)
('d0edfa4f-1dce-44f2-b6bf-2b2227addc12', 'Andaman DMC', 'A comprehensive travel and tour management platform built by PS Web Studio that streamlines destination management operations with powerful booking and content management capabilities. This all-in-one solution enables seamless tour package creation, real-time booking processing, and efficient customer relationship management for travel professionals.', 'Andaman DMC', 'Travel & Tourism', 'Custom Web Development', '6 Weeks', '3 Developers', 'Live', '2020',
ARRAY['Tour Package Management - Create, edit, and manage comprehensive tour packages with detailed pricing structures, high-quality images, and complex multi-day itineraries with ease.','Online Booking System - Real-time booking engine with date selection, multiple ticket types, secure payment gateway integration, and instant confirmation emails.','Admin Dashboard - Full-featured CMS for effortless management of content, bookings, customer data, and reporting analytics.','Dynamic Search & Filter - Advanced search functionality allowing users to filter packages by destination, trip duration, price range, and activity type.','Responsive Design - Fully optimized experience across desktop, tablet, and mobile devices with touch-friendly interfaces.','SEO Optimization - Comprehensive SEO implementation including meta tags, XML sitemaps, and schema markup for improved search visibility.','Enquiry & Contact Forms - Custom-built forms with email notifications, database storage, and automated response management.'],
'{"backend":["PHP (Core / Laravel)","MySQL Database","AJAX / jQuery","RESTful API Integration"],"frontend":["HTML5 / CSS3","JavaScript (ES6+)","Bootstrap 5","Responsive UI Design"]}',
ARRAY['andaman-dmc.png','andaman-dmc2.png','andaman-dmc3.png'],
'{"design":"Created a modern travel-focused interface with responsive layouts, package cards, destination sections, enquiry forms, testimonials, service sections, call-to-action areas, consistent typography, spacing, and mobile-friendly navigation.","database":"Structured and managed MySQL database content for travel packages, destinations, enquiries, and other dynamic website information. Implemented database connectivity and CRUD operations where required.","deployment":"Prepared and deployed the website to the production hosting environment, configured the domain and hosting setup, tested forms and website functionality, verified responsive layouts across devices and browsers, and completed basic technical SEO and production checks.","development":"Developed responsive frontend pages and interactive components using HTML5, CSS3, JavaScript, Bootstrap, jQuery, and SCSS. Implemented package sections, sliders, animations, navigation, enquiry forms, validation, dynamic content, and cross-device functionality."}',
'PS Web Studio delivered a professional, feature-rich platform that exceeded our expectations. The booking system works flawlessly, and the admin panel makes content management effortless. Our business operations have become significantly more efficient.', 'Andaman DMC Team', 'https://www.andamandmc.com', 'andaman-dmc', true, true, 1, '2026-08-08 19:14:09.957+00', now()),

-- 2. Andaman Vacation
('27681235-1e51-48d0-b8c3-26117d8eae42', 'Andaman Vacation', 'A modern travel and tourism website focused on promoting Andaman holiday packages, honeymoon tours, sightseeing experiences, destination weddings, beach tours, ferry services, and customized vacation planning. The website is designed to showcase travel packages, destinations, services, testimonials, and generate direct customer enquiries through online enquiry forms.', 'Andaman Vacation', 'Travel & Tourism', 'Travel & Tourism Website', '2026', 'Frontend Developer', 'Live', '2026',
ARRAY['Responsive Travel Website - Fully responsive layout optimized for desktop, tablet, and mobile devices.','Travel Package Listings - Organized presentation of Andaman holiday packages with key information and attractive visuals.','Detailed Package Pages - Dedicated pages showcasing package details, inclusions, itineraries, pricing information, and travel highlights.','Honeymoon Packages - Dedicated honeymoon travel experiences designed for couples visiting Andaman.','Sightseeing Experiences - Showcases popular Andaman attractions, beaches, islands, and sightseeing activities.','Destination Information - Informative destination sections helping travelers explore different locations and experiences.','Customized Tour Enquiry - Allows visitors to submit their requirements for personalized holiday planning.','Online Enquiry Forms - Customer-friendly enquiry forms designed to capture travel and contact information.'],
'{"backend":["PHP","MySQL","AJAX","REST-style form/API integration","Server-side form processing","CRUD Operations"],"frontend":["HTML5","CSS3","JavaScript (ES6+)","Bootstrap","jQuery","Responsive Web Design"]}',
ARRAY['andaman.vacation1.png','andaman.vacation2.png','andaman.vacation3.png'],
'{"design":"Created a modern travel-focused interface with responsive layouts, package cards, destination sections, enquiry forms, testimonials, service sections, call-to-action areas, consistent typography, spacing, and mobile-friendly navigation.","database":"Structured and managed MySQL database content for travel packages, destinations, enquiries, and other dynamic website information. Implemented database connectivity and CRUD operations where required.","deployment":"Prepared and deployed the website to the production hosting environment, configured the domain and hosting setup, tested forms and website functionality, verified responsive layouts across devices and browsers, and completed basic technical SEO and production checks.","development":"Developed responsive frontend pages and interactive components using HTML5, CSS3, JavaScript, Bootstrap, jQuery, and SCSS. Implemented package sections, sliders, animations, navigation, enquiry forms, validation, dynamic content, and cross-device functionality."}',
'Great experience from start to finish. The website looks modern, works smoothly across devices, and presents our Andaman packages in a clear and professional way. The enquiry process is simple and easy for our customers to use.', '— AndamanVacation', 'https://andamanvacation.com', 'andaman-vacation', false, true, 2, '2026-08-13 17:58:45.305521+00', now()),

-- 3. Andaman Travel Expert
('ab22701a-05a1-4e0c-97ec-53c31b5d1c04', 'Andaman Travel Expert', 'Andaman Travel Expert is a travel and tourism platform for personalized holiday planning across the Andaman and Nicobar Islands. The website lists customized island tour packages, honeymoon escapes, family holidays, luxury vacations, group tours and adventure experiences. Travellers can look up destinations including Port Blair, Swaraj Dweep (Havelock Island), Shaheed Dweep (Neil Island), Baratang, Diglipur and Ross Island. Local destination knowledge, accommodation, ferry arrangements, sightseeing, water sports and itinerary planning are covered in one place.', 'Andaman Travel Expert Private Limited', 'Travel, Tourism & Hospitality', 'Travel Website Development, Holiday Booking Platform, UI/UX Design, SEO & Digital Solutions', 'Live Website', 'Web Development, UI/UX Design, Content Strategy & SEO Team', 'Live', '2026',
ARRAY['Customized Island Packages - Honeymoon, family, luxury and group tour packages with clear inclusions and itinerary details.','Destination Guides - Dedicated sections for Port Blair, Havelock, Neil Island, Baratang, Diglipur and Ross Island.','Adventure & Water Sports - Listings for scuba diving, snorkeling, sea walking and other island activities.','Accommodation & Ferry Planning - Stay options and inter-island ferry arrangements presented alongside each package.','Personalized Itinerary Enquiry - Enquiry forms that capture travel dates, group size and preferences for a tailored quote.','Responsive Design - Layouts tested on desktop, tablet, and mobile devices.','SEO Optimization - Meta tags, XML sitemap, clean URLs and schema markup for package and destination pages.'],
'{"backend":["PHP","MySQL","AJAX","jQuery"],"frontend":["HTML5 / CSS3","JavaScript","Bootstrap 5","Responsive UI Design"]}',
ARRAY['andaman-travel-expert.png','andaman-travel-expert-2.png','andaman-travel-expert-3.png'],
'{"design":"Travel-focused interface with package cards, destination sections, enquiry call-to-actions, consistent typography and mobile-friendly navigation.","database":"MySQL content structure for packages, destinations, activities and enquiries.","deployment":"Deployed to production hosting with domain and SSL setup, form testing, cross-device checks and basic technical SEO.","development":"Responsive pages and components built with HTML5, CSS3, JavaScript, Bootstrap and jQuery, including package sections, sliders, validated enquiry forms and dynamic content."}',
'', '', 'https://www.andamantravelexpert.com', 'andaman-travel-expert', false, true, 3, '2026-11-08 13:54:57.784203+00', now()),

-- 4. Explore Andamans
('90b662ab-cd08-41b1-b23a-a8d07321ab18', 'Explore Andamans', 'Explore Andamans is a travel technology and tourism platform for the Andaman and Nicobar Islands. The website combines customized holiday packages, online ferry ticket bookings, island tours, water sports, adventure activities, hotel reservations, cab rentals and local experiences. Travellers can plan visits to Port Blair, Swaraj Dweep (Havelock Island), Shaheed Dweep (Neil Island), Ross Island, North Bay and Baratang, with options for families, honeymooners, adventure seekers, groups and corporate travellers.', 'Explore Andamans', 'Travel, Tourism & Travel Technology', 'Travel Portal Development, Online Booking Platform, Tourism Website, UI/UX Design & Digital Solutions', 'Live Website', 'Web Development, UI/UX Design, Booking Integration, Content & SEO Team', 'Live', '2026',
ARRAY['Online Ferry Ticket Booking - Book inter-island ferry tickets online with schedule and availability details.','Holiday Package Listings - Customized packages for families, honeymooners, groups and corporate travellers.','Island Tours & Activities - Water sports, adventure activities and sightseeing tours across the main islands.','Hotel & Cab Booking - Hotel reservations and cab rentals available alongside packages.','Destination Pages - Dedicated pages for Port Blair, Havelock, Neil Island, Ross Island, North Bay and Baratang.','Enquiry & Itinerary Requests - Forms for custom itineraries with email notifications and database storage.','Responsive Design - Layouts tested on desktop, tablet, and mobile devices.','SEO Optimization - Meta tags, XML sitemap and schema markup across package and destination pages.'],
'{"backend":["PHP","MySQL","AJAX","jQuery","Booking Integration"],"frontend":["HTML5 / CSS3","JavaScript","Bootstrap 5","Responsive UI Design"]}',
ARRAY['explore-andamans.png','explore-andamans-2.png','explore-andamans-3.png'],
'{"design":"Booking-focused interface with clear service categories, package cards, destination sections and simple enquiry and booking flows on mobile and desktop.","database":"MySQL content structure for packages, tours, activities, bookings and enquiries.","deployment":"Deployed to production hosting with domain and SSL setup, form and booking flow testing, and cross-device checks.","development":"Responsive frontend built with HTML5, CSS3, JavaScript, Bootstrap and jQuery, with dynamic listings, validated forms and booking integration."}',
'', '', 'https://www.exploreandaman.co.in', 'explore-andamans', false, true, 4, '2026-11-08 13:58:00.717566+00', now()),

-- 5. Andaman Travel Agent
('b083b661-93e8-4e17-beec-dc87029c8aed', 'Andaman Travel Agent', 'A curated tour and travel platform offering local expertise and customized experiences across the Andaman Islands with a focus on authentic island adventures. This user-friendly platform connects travelers with verified local guides and unique island experiences.', 'Andaman Travel Agent', 'Travel & Tourism', 'Custom Web Development', '5 Weeks', '2 Developers', 'Live', '2026',
ARRAY['Curated Tour Packages - Handpicked experiences with local expertise featuring unique island adventures and cultural immersion.','Custom Itinerary Builder - Build your perfect trip with flexible options including activity selection, duration, and accommodation preferences.','Local Guide Integration - Connect with verified local guides who provide authentic island experiences and insider knowledge.','Activity Booking - Book water sports, scuba diving, island hopping, and adventure activities with instant confirmation.','Real-time Availability - Check tour and activity availability instantly with live inventory management.','Mobile-Friendly Design - Optimized for travelers on the go with responsive interfaces and touch-friendly navigation.'],
'{"backend":["PHP","MySQL","AJAX","jQuery"],"frontend":["HTML5 / CSS3","JavaScript","Bootstrap 5","Responsive Design"]}',
ARRAY['andaman-travel-agent.png','andaman-travel-agent-2.png','andaman-travel-agent-3.png'],
'{"design":"Travel-focused UI/UX with emphasis on visual storytelling, authentic imagery, and intuitive navigation.","database":"MySQL database for tour packages, bookings, customer data, and guide management.","deployment":"Shared hosting with CDN integration and SSL configuration for security.","development":"Full-stack development with PHP and MySQL for efficient tour management and booking processing."}',
'PS Web Studio understood our local expertise and built a platform that truly showcases it. Our customers love the easy booking process and the authentic experiences we offer. Highly recommended!', 'Andaman Travel Agent', 'https://www.andamantravelagent.com', 'andaman-travel-agent', false, true, 5, '2026-08-08 19:14:11.768+00', now()),

-- 6. Hotel in Andaman
('d087f3ea-55f7-403d-9437-4e91a6d43a15', 'Hotel in Andaman', 'A comprehensive accommodation guide and booking platform for hotels, resorts, and homestays across the Andaman Islands with real-time availability and competitive pricing. This user-friendly platform simplifies island accommodation discovery and booking.', 'Hotel in Andaman', 'Hospitality', 'Custom Web Development', '4 Weeks', '2 Developers', 'Live', '2026',
ARRAY['Hotel Listing - Comprehensive listings of hotels, resorts, and homestays with detailed descriptions and high-quality images.','Real-time Availability - Check room availability instantly with live inventory management and booking confirmation.','Price Comparison - Compare prices across properties to find the best deals and value for money.','Guest Reviews - Authentic reviews from verified guests with detailed feedback and ratings system.','Location Map - Interactive maps showing property locations with distance to attractions and landmarks.','Flexible Booking - Choose from multiple booking options with flexible cancellation and modification policies.'],
'{"backend":["PHP","MySQL","AJAX"],"frontend":["HTML5 / CSS3","JavaScript","Bootstrap 5"]}',
ARRAY['hia.png','hia2.png','hia3.png'],
'{"design":"Clean, hotel-focused UI with easy navigation, intuitive search, and user-friendly booking flow.","database":"MySQL for property data, booking management, user profiles, and review systems.","deployment":"High-availability hosting with SSL security and performance optimization.","development":"PHP development with robust hotel management system and efficient booking processing."}',
'Hotel in Andaman has become the go-to platform for island accommodations. The real-time availability feature is excellent and our users appreciate the comprehensive property listings and easy booking process.', 'Hotel in Andaman', 'https://www.hotelinandaman.com', 'hotel-in-andaman', false, true, 6, '2026-08-08 19:14:13.456+00', now()),

-- 7. Ladakh DMC
('b56d3679-ca6b-47fc-b4f2-68c2f88da05e', 'Ladakh DMC', 'Ladakh DMC is a destination management and B2B travel platform operated under Quest Guide India Private Limited. The website presents ground handling services for travel agents, tour operators and corporate travel planners: customized Ladakh tour packages, hotel bookings, transportation, Inner Line Permit assistance, group tour management, corporate travel and MICE services, and adventure expedition logistics across Leh, Nubra Valley, Pangong Lake, Tso Moriri and other Himalayan destinations.', 'Quest Guide India Private Limited', 'Travel, Tourism & Destination Management', 'B2B Travel Portal, DMC Website Development, Tour Package Management, UI/UX Design & SEO', 'Live Website', 'Web Development, UI/UX Design, Content Strategy & SEO Team', 'Live', '2026',
ARRAY['B2B Service Showcase - Clear presentation of ground handling services for agents, tour operators and corporate planners.','Ladakh Tour Packages - Customized itineraries covering Leh, Nubra Valley, Pangong Lake and Tso Moriri.','Inner Line Permit Assistance - Information and support for permit requirements on restricted routes.','Hotel & Transport Arrangements - Accommodation and vehicle coordination presented per itinerary.','Group, Corporate & MICE Services - Dedicated sections for group departures, corporate travel and MICE requirements.','Trade Enquiry Forms - Lead forms built for travel agents and operators, with email notifications and database storage.','Responsive Design - Layouts tested on desktop, tablet, and mobile devices.','SEO Optimization - Meta tags, XML sitemap and schema markup for destination and service pages.'],
'{"backend":["PHP","MySQL","AJAX","jQuery"],"frontend":["HTML5 / CSS3","JavaScript","Bootstrap 5","Responsive UI Design"]}',
ARRAY['ladakh-dmc.png','ladakh-dmc-2.png','ladakh-dmc-3.png'],
'{"design":"Trade-focused layout with service categories, destination sections and prominent enquiry call-to-actions, kept clean for agents who scan quickly.","database":"MySQL content structure for packages, destinations, services and trade enquiries.","deployment":"Deployed to production hosting with domain and SSL setup, form testing, cross-device checks and basic technical SEO.","development":"Responsive pages built with HTML5, CSS3, JavaScript, Bootstrap and jQuery, including validated enquiry forms and dynamic content."}',
'', '', 'https://www.ladakhdmc.in', 'ladakh-dmc', false, true, 7, '2026-11-08 13:53:03.950493+00', now()),

-- 8. Ladakh Life
('74939a3c-fe42-4596-8fd0-c2474728bd94', 'Ladakh Life', 'Ladakh Life is a travel and tourism website for Ladakh tours. It lists Leh Ladakh tour packages, customized itineraries, honeymoon trips, family vacations, group tours and bike expeditions. Travellers can read about Nubra Valley, Pangong Lake, Tso Moriri, Zanskar Valley and Khardung La, and find accommodation, transport and local travel assistance in one place.', 'Ladakh Life Expeditions', 'Travel, Tourism & Adventure', 'Tour Package Management, UI/UX Design, SEO & Digital Marketing', 'Live Website', 'Web Development, UI/UX Design, Content Writing & SEO Team', 'Live', '2026',
ARRAY['Leh Ladakh Tour Packages - Itineraries for families, couples, groups and honeymooners with day-wise details.','Bike Expeditions - Dedicated pages for motorbike trips with route, duration and inclusions.','Destination Pages - Nubra Valley, Pangong Lake, Tso Moriri, Zanskar Valley and Khardung La.','Accommodation & Transport - Stay and vehicle options presented with each itinerary.','Customized Trip Enquiry - Forms that capture dates, group size and interests for a tailored quote.','Responsive Design - Layouts tested on desktop, tablet, and mobile devices.','SEO Optimization - Meta tags, XML sitemap and schema markup for package and destination pages.'],
'{"backend":["PHP","MySQL","AJAX","jQuery"],"frontend":["HTML5 / CSS3","JavaScript","Bootstrap 5","Responsive UI Design"]}',
ARRAY['ladakh-life.png','ladakh-life-2.png','ladakh-life-3.png'],
'{"design":"Adventure-focused interface with large destination imagery, package cards and clear enquiry call-to-actions.","database":"MySQL content structure for packages, destinations, expeditions and enquiries.","deployment":"Deployed to production hosting with domain and SSL setup, form testing, cross-device checks and basic technical SEO.","development":"Responsive pages built with HTML5, CSS3, JavaScript, Bootstrap and jQuery, including sliders, validated enquiry forms and dynamic content."}',
'', '', 'https://ladakhlife.com', 'ladakh-life', false, true, 8, '2026-11-08 13:51:31.502642+00', now()),

-- 9. Madhya Pradesh DMC
('0c4da1cb-a62b-4568-9b00-0350102b2909', 'Madhya Pradesh DMC', 'A specialized travel portal showcasing the heart of India with heritage tours, wildlife safaris, and cultural experiences across Madhya Pradesh. This immersive platform brings the rich cultural heritage and natural beauty of central India to travelers worldwide.', 'Madhya Pradesh DMC', 'Travel & Tourism', 'Custom Web Development', '6 Weeks', '3 Developers', 'Live', '2026',
ARRAY['Heritage Tour Packages - Explore magnificent forts, royal palaces, and UNESCO World Heritage sites with expert guides.','Wildlife Safari Booking - Book exciting safaris in national parks and sanctuaries with tiger sightings and wildlife photography.','Cultural Experience - Local crafts, festivals, cuisine experiences, and traditional art forms of Madhya Pradesh.','Custom Itinerary Builder - Create personalized MP tours with flexible options for heritage, wildlife, and culture.','Guide & Transport Integration - Book local guides and vehicles with real-time availability and competitive pricing.','Photo Gallery - Showcase MP''s natural beauty and cultural heritage with professional high-quality images.'],
'{"backend":["PHP (Laravel)","MySQL","AJAX","jQuery"],"frontend":["HTML5 / CSS3","JavaScript","Bootstrap 5","Responsive Design"]}',
ARRAY['mp.png','mp2.png','mp3.png'],
'{"design":"Warm, inviting design reflecting Madhya Pradesh''s royal heritage with rich colors and cultural elements.","database":"MySQL for tour packages, bookings, customer management, and content storage.","deployment":"VPS hosting with optimization for Indian audience and fast loading speeds.","development":"Laravel-based development with robust booking management and content administration features."}',
'Madhya Pradesh DMC now has a professional portal that showcases the best of MP. The wildlife safari booking feature is very popular among our customers and has significantly increased our bookings.', 'Madhya Pradesh DMC', 'https://www.madhyapradeshdmc.com', 'madhya-pradesh-dmc', false, true, 9, '2026-08-08 19:14:12.591+00', now()),

-- 10. MPDMC
('45e4f078-d494-4cd7-8ea8-124f34fb996b', 'MPDMC', 'A specialized travel platform focusing on wildlife, heritage tours, and authentic experiences in Madhya Pradesh with a commitment to sustainable tourism. This purpose-built platform delivers immersive travel experiences with expert local guidance.', 'MPDMC', 'Travel & Tourism', 'Custom Web Development', '5 Weeks', '2 Developers', 'Live', '2026',
ARRAY['Wildlife Tours - Tiger safaris, wildlife photography tours, and bird watching experiences in national parks.','Heritage Walks - Guided tours of historical sites, ancient temples, and architectural marvels of Madhya Pradesh.','Custom Packages - Tailored tours for families, couples, groups, and solo travelers with personalized itineraries.','Expert Local Guides - Verified guides with deep local knowledge and expertise in wildlife and heritage.','Easy Booking - Simple booking process with instant confirmation and flexible cancellation policies.','Sightseeing Planning - Complete MP travel planning with comprehensive destination guides and recommendations.'],
'{"backend":["PHP","MySQL","AJAX"],"frontend":["HTML5 / CSS3","JavaScript","Bootstrap 5"]}',
ARRAY['mpdmc.png','mpdmc2.png','mpdmc3.png'],
'{"design":"Clean, professional design focused on MP''s natural and cultural heritage with immersive visual experiences.","database":"MySQL for efficient data management, booking processing, and content organization.","deployment":"Optimized hosting for fast loading speeds and reliable performance.","development":"PHP-based development with focus on performance, security, and user experience."}',
'PS Web Studio created a beautiful platform that truly represents MP''s heritage. The wildlife tour bookings have increased significantly since the launch. Their understanding of our requirements was exceptional.', 'MPDMC Team', 'https://www.mpdmc.com', 'mpdmc', false, true, 10, '2026-08-08 19:14:12.993+00', now()),

-- 11. Explore Madhya Pradesh
('bae36802-684e-4ae7-8964-e8ef1bc84163', 'Explore Madhya Pradesh', 'Explore Madhya Pradesh is a travel and tourism website covering the heritage, culture, wildlife and spiritual sites of central India. Travellers can browse destinations and holiday packages for tiger safaris in Kanha, Bandhavgarh and Pench, the temples of Khajuraho, the forts of Orchha and Gwalior, and pilgrimage towns such as Ujjain and Omkareshwar, with travel content and personalized tour enquiries.', 'Explore Madhya Pradesh', 'Travel & Tourism', 'Tourism Website Development, UI/UX Design, Travel Content & Digital Marketing', 'Live Website', 'Web Development, UI/UX Design, Content Writing & Digital Marketing', 'Live', '2026',
ARRAY['Wildlife Safari Packages - Tiger safari tours in Kanha, Bandhavgarh and Pench with park and zone details.','Heritage Destinations - Khajuraho, Orchha and Gwalior pages covering temples, forts and palaces.','Spiritual Circuits - Ujjain and Omkareshwar itineraries for pilgrimage travellers.','Holiday Package Listings - Customized packages with inclusions, itinerary and pricing information.','Travel Content - Destination guides and travel articles to support trip planning.','Personalized Tour Enquiry - Enquiry forms for tailored itineraries with email notifications.','Responsive Design - Layouts tested on desktop, tablet, and mobile devices.','SEO Optimization - Meta tags, XML sitemap and schema markup for destination and package pages.'],
'{"backend":["PHP","MySQL","AJAX","jQuery"],"frontend":["HTML5 / CSS3","JavaScript","Bootstrap 5","Responsive UI Design"]}',
ARRAY['explore-madhya-pradesh.png','explore-madhya-pradesh-2.png','explore-madhya-pradesh-3.png'],
'{"design":"Content-led layout with destination imagery, package cards and clear enquiry call-to-actions.","database":"MySQL content structure for packages, destinations, articles and enquiries.","deployment":"Deployed to production hosting with domain and SSL setup, form testing, cross-device checks and basic technical SEO.","development":"Responsive pages built with HTML5, CSS3, JavaScript, Bootstrap and jQuery, including sliders, validated enquiry forms and dynamic content."}',
'', '', 'https://www.exploremadhyapradesh.com', 'explore-madhya-pradesh', false, true, 11, '2026-11-08 11:25:55.299403+00', now()),

-- 12. Incredible South India
('38238585-cbfe-481b-bd83-4333580e1bae', 'Incredible South India', 'Incredible South India is a travel and tourism website covering the destinations, culture and travel experiences of South India. It helps travellers explore places, compare holiday packages and plan trips across Kerala, Tamil Nadu, Karnataka, Andhra Pradesh and Telangana, with destination guides and travel content written for trip planning.', 'Incredible South India', 'Travel & Tourism', 'Travel Website, Tourism Portal & Digital Marketing', 'Live Website', 'Web Development, UI/UX Design & Digital Content', 'Live', '2026',
ARRAY['Destination Guides - State-wise pages for Kerala, Tamil Nadu, Karnataka, Andhra Pradesh and Telangana.','Holiday Package Listings - Packages with itinerary, inclusions and pricing information.','Itinerary & Blog Pages - Reusable PHP page templates for travel articles and day-wise itineraries.','Travel Enquiry Forms - Forms for custom trip requests with email notifications and database storage.','Responsive Design - Layouts tested on desktop, tablet, and mobile devices.','SEO Optimization - Meta tags, XML sitemap, clean URLs and schema markup for destination and blog pages.'],
'{"backend":["PHP","MySQL","AJAX","jQuery"],"frontend":["HTML5 / CSS3","JavaScript","Bootstrap 5","Responsive UI Design"]}',
ARRAY['incredible-south-india.png','incredible-south-india-2.png','incredible-south-india-3.png'],
'{"design":"Content-led layout with state-wise navigation, destination imagery and package cards, kept consistent across blog and itinerary pages.","database":"MySQL content structure for packages, destinations, articles and enquiries.","deployment":"Deployed to production hosting with domain and SSL setup, form testing, cross-device checks and basic technical SEO.","development":"Responsive pages built with HTML5, CSS3, JavaScript, Bootstrap and jQuery on a reusable PHP page template."}',
'', '', 'https://www.incrediblesouthindia.com', 'incredible-south-india', false, true, 12, '2026-11-08 11:22:05.062379+00', now()),

-- 13. Tripzolo
('320f22fd-32b7-4aea-8cb6-05bd94491ff1', 'Tripzolo', 'Tripzolo is a travel and holiday booking platform for domestic and international holidays. The website lists customized packages, curated experiences, luxury stays, hotel bookings and group tours, with destination discovery, themed holiday collections and personalized enquiry options. It also covers corporate travel management and MICE solutions for business travellers.', 'Tripzolo India Private Limited', 'Travel, Tourism & Hospitality', 'Travel Portal Holiday Booking Platform', 'Live Website', 'Web Development, UI/UX Design, Content & Digital Solutions Team', 'Live', '2026',
ARRAY['Domestic & International Packages - Customized holiday packages with itinerary, inclusions and pricing information.','Themed Holiday Collections - Honeymoon, family, luxury and group collections for faster discovery.','Destination Discovery - Destination pages with sightseeing highlights and travel information.','Hotel & Luxury Stay Listings - Accommodation options presented alongside packages.','Corporate Travel & MICE - Dedicated sections for business travel and MICE requirements.','Personalized Enquiry - Enquiry forms for tailored holiday quotes.','Responsive Design - Layouts tested on desktop, tablet, and mobile devices.'],
'{"backend":["PHP","MySQL","AJAX","jQuery"],"frontend":["HTML5 / CSS3","JavaScript","Bootstrap 5","Responsive UI Design"]}',
ARRAY['tripzolo.png','tripzolo2.png','tripzolo3.png'],
'{"design":"Booking-platform interface with themed collections, package cards, destination sections and clear enquiry call-to-actions.","database":"MySQL content structure for packages, destinations, collections and enquiries.","deployment":"Deployed to production hosting with domain and SSL setup, form testing and cross-device checks.","development":"Responsive frontend built with HTML5, CSS3, JavaScript, Bootstrap and jQuery, with dynamic listings and validated enquiry forms."}',
'', '', 'https://www.tripzolo.com', 'tripzolo', false, true, 13, '2026-11-08 13:49:23.926474+00', now()),

-- 14. Quest Guide India
('1f8461aa-4387-436e-b05e-a8a17befcc4b', 'Quest Guide India', 'A pan-India tour and travel services platform connecting travelers with authentic experiences across the country through expert local guides and curated itineraries. This comprehensive platform covers all major destinations with multi-city travel planning.', 'Quest Guide India', 'Travel & Tourism', 'Custom Web Development', '7 Weeks', '3 Developers', 'Live', '2026',
ARRAY['Pan-India Tour Packages - Comprehensive coverage of all major destinations across India with expert curated experiences.','Multi-city Itineraries - Create complex multi-destination trips with seamless transitions between cities and experiences.','Cultural Experience Booking - Book heritage walks, cooking classes, traditional performances, and cultural immersion activities.','Transport Integration - Book flights, trains, and local transport with real-time availability and pricing.','Customer Reviews - Authentic reviews from verified travelers with detailed feedback and ratings.','Multi-language Support - Content available in English, Hindi, and regional languages for wider audience reach.'],
'{"backend":["Node.js","Express.js","MongoDB","RESTful API"],"frontend":["React.js","CSS3","Bootstrap","Responsive UI"]}',
ARRAY['qg.png','qg2.png','qg3.png'],
'{"design":"Modern, vibrant UI reflecting India''s diverse culture and travel experiences with engaging visual storytelling.","database":"MongoDB for flexible tour package data, booking management, and user profiles.","deployment":"Cloud hosting with auto-scaling capabilities and global CDN distribution.","development":"Full-stack development with React and Node.js for scalable high-performance applications."}',
'Quest Guide India now has a professional platform that represents our pan-India presence perfectly. The multi-city booking feature is a game-changer for our business and our customers absolutely love it.', 'Quest Guide India Team', 'https://www.questguideindia.com', 'quest-guide-india', false, true, 14, '2026-08-08 19:14:12.182+00', now()),

-- 15. TSC Barcode Printers
('fd0f9bb5-c3f2-4a8c-beac-766bad9d255b', 'TSC Barcode Printers', 'A comprehensive corporate website developed for TSC barcode printers, showcasing desktop printers, industrial printers, mobile printers, accessories, and complete barcode printing solutions. The platform features product catalog management, business enquiry systems, and seamless navigation for B2B clients.', 'TSC Printers', 'Barcode & Printing Solutions', 'Custom Web Development', '6 Weeks', '3 Developers', 'Live', '2026',
ARRAY['Product Catalog - Comprehensive listings of desktop, industrial, and mobile barcode printers with detailed specifications','Product Comparison - Side-by-side comparison of printer models and features','Accessories Showcase - Display of ribbons, labels, and printing accessories','Enquiry Management - Contact forms with automated response and lead tracking','Technical Support - Downloadable drivers, manuals, and firmware updates','Partner Network - Connect with authorized resellers and service providers','Responsive Design - Optimized for desktop, tablet, and mobile devices','SEO Optimization - Meta tags, sitemaps, and schema markup for better visibility'],
'{"backend":["PHP (Core / Laravel)","MySQL Database","AJAX / jQuery","RESTful API Integration"],"frontend":["HTML5 / CSS3","JavaScript (ES6+)","Bootstrap 5","Responsive UI Design"]}',
ARRAY['tscprinters.png','tscprinters2.png','tscprinters3.png'],
'{"design":"Professional, tech-focused UI/UX design with clean product presentation and intuitive navigation structure.","database":"MySQL database design for product catalogs, specifications, and enquiry management with optimized queries.","deployment":"High-availability hosting with SSL security and performance optimization for fast loading speeds.","development":"Full-stack development with PHP, MySQL, HTML5, CSS3, and JavaScript following best practices and coding standards."}',
'TSC Printers needed a professional platform that could showcase their extensive product range and provide seamless enquiry management for B2B clients. PS Web Studio delivered a feature-rich solution that has significantly improved their online presence and lead generation.', 'TSC Barcode Printers Team', 'https://www.tscbarcodeprinters.com', 'tsc-barcode-printers', false, true, 15, '2026-08-09 11:03:29.087171+00', now()),

-- 16. Markaa
('c2f5aecb-0f30-45e3-819d-bef02e9ea34b', 'Markaa', 'A comprehensive barcode and printing solutions platform delivering reliable, efficient, and customized solutions for businesses across industries. Markaa.in combines quality products, professional services, and seamless customer experience to meet diverse barcode, labeling, printing, and identification requirements. From business labels and barcode solutions to specialized printing needs, the platform is designed to provide dependable technology and practical solutions that streamline operations and enhance business efficiency.', 'Markaa', 'Barcode & Printing Solutions', 'Custom Web Development', '6 Weeks', '3 Developers', 'Live', '2020',
ARRAY['Barcode Solutions - Reliable barcode systems and products designed for efficient product identification, tracking, and inventory management.','Label Printing - High-quality custom label printing solutions tailored to meet diverse business and product labeling requirements.','Barcode Printers - Professional barcode printing equipment offering fast, accurate, and consistent printing for everyday business operations.','Thermal Printing Solutions - Efficient thermal printing technology for producing durable, clear, and high-quality labels without the need for traditional ink.','Custom Printing Services - Flexible printing solutions customized to suit specific business requirements, including size, material, design, and application.','Business Identification Solutions - Comprehensive solutions for labeling, tagging, tracking, and identification that help businesses streamline operations and improve efficiency.'],
'{"backend":["Node.js","Express.js","MongoDB","RESTful API"],"frontend":["React.js","Tailwind CSS","Responsive Design"]}',
ARRAY['markaa.png','markaa2.png','markaa3.png'],
'{"design":"Modern, business-focused design with a clean visual identity, intuitive layouts, and user-centric interfaces that clearly showcase barcode, labeling, and printing solutions while delivering a seamless and professional browsing experience.","database":"MongoDB for flexible and scalable data management, enabling efficient storage of product information, service details, customer data, and business content.","deployment":"Cloud-based deployment with CDN integration for fast, secure, and reliable website performance, ensuring seamless access and optimized content delivery across locations and devices.","development":"Full-stack development using modern web technologies to deliver a scalable, high-performance platform with seamless product presentation, service management, responsive interfaces, and an efficient user experience."}',
'“Markaa now has a professional digital platform that represents our barcode and printing solutions perfectly. The website is clean, intuitive, and makes it much easier for customers to explore our products and services. PS Web Studio delivered exceptional quality, performance, and attention to detail throughout the project.”', 'Markaa Team', 'https://www.markaa.in', 'markaa', false, true, 16, '2026-08-08 19:14:13.865+00', now())

ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  client = EXCLUDED.client,
  industry = EXCLUDED.industry,
  type = EXCLUDED.type,
  timeline = EXCLUDED.timeline,
  team = EXCLUDED.team,
  status = EXCLUDED.status,
  year = EXCLUDED.year,
  features = EXCLUDED.features,
  tech_stack = EXCLUDED.tech_stack,
  images = EXCLUDED.images,
  scope = EXCLUDED.scope,
  testimonial = EXCLUDED.testimonial,
  testimonial_author = EXCLUDED.testimonial_author,
  live_url = EXCLUDED.live_url,
  slug = EXCLUDED.slug,
  is_featured = EXCLUDED.is_featured,
  is_enabled = EXCLUDED.is_enabled,
  display_order = EXCLUDED.display_order,
  updated_at = now();

COMMIT;
