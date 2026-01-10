<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <title>Psweb Studio - Web Design & Development</title>
  <!-- SEO Meta Tags -->
  <meta name="description" content="Psweb Studio offers professional web design, development, and digital solutions to help your business grow online.">
  <meta name="keywords" content="web design, web development, digital solutions, SEO, frontend development, Psweb Studio">
  <meta name="robots" content="index, follow">

  <!-- Favicon -->
  <link rel="icon" href="images/favico/favicon.ico" type="image/x-icon">
  <link rel="shortcut icon" href="images/favico/favicon.ico" type="image/x-icon">
  <link rel="apple-touch-icon" sizes="57x57" href="images/favico/apple-touch-icon-57x57.png">
  <link rel="apple-touch-icon" sizes="76x76" href="images/favico/apple-touch-icon-76x76.png">
  <link rel="apple-touch-icon" sizes="120x120" href="images/favico/apple-touch-icon-120x120.png">
  <link rel="apple-touch-icon" sizes="152x152" href="images/favico/apple-touch-icon-152x152.png">
  <link rel="apple-touch-icon" sizes="180x180" href="images/favico/apple-touch-icon-180x180.png">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">

  <!-- CSS Files -->
  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="assets/vendor/aos/aos.css" rel="stylesheet">
  <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
  <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">
  <link href="assets/css/main.css" rel="stylesheet">

  <!-- Schema.org JSON-LD for Organization -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Psweb Studio",
    "url": "https://www.PSWeb Studio.com",
    "logo": "https://www.PSWeb Studio.com/assets/img/favico/favicon.ico",
    "sameAs": [
      "https://www.facebook.com/PSWeb Studio",
      "https://www.linkedin.com/company/PSWeb Studio",
      "https://twitter.com/PSWeb Studio"
    ],
    "description": "Psweb Studio offers professional web design, development, and digital solutions to help your business grow online."
  }
  </script>
</head>

<body class="index-page">

  <header id="header" class="header sticky-top">
    <div class="nav-wrap">

      <div class="container d-flex justify-content-between position-relative">
              <a href="index.html" class="logo d-flex align-items-center">
         <img src="images/psweb-logo.png" alt="logo">
        </a>
        <nav id="navmenu" class="navmenu">
          <ul>
            <li><a href="#hero" class="active">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#team">Team</a></li>
            <li class="dropdown"><a href="#"><span>More</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
              <ul>
                <li><a href="#">Profile</a></li>
                <li><a href="#">Portfolio</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </li>
            <li><a href="contact-us.php" class="contact-blink">Contact</a></li>
          </ul>
          <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>
      </div>
    </div>

  </header>

  <main class="main">
    <section id="contact" class="contact section dark-background">

  <div class="container section-title" data-aos="fade-up">
    <h2>Contact</h2>
    <p>Need Help? Contact Us</p>
  </div>

  <div class="container position-relative" data-aos="fade-up" data-aos-delay="100">
    <div class="row gy-4">

      <!-- Contact Info -->
      <div class="col-lg-5">
        <div class="info-item d-flex">
          <i class="bi bi-geo-alt flex-shrink-0"></i>
          <div>
            <h3>Address</h3>
            <p>A108 Adam Street, New York, NY 535022</p>
          </div>
        </div>

        <div class="info-item d-flex">
          <i class="bi bi-telephone flex-shrink-0"></i>
          <div>
            <h3>Call Us</h3>
            <p>+1 5589 55488 55</p>
          </div>
        </div>

        <div class="info-item d-flex">
          <i class="bi bi-envelope flex-shrink-0"></i>
          <div>
            <h3>Email Us</h3>
            <p>info@example.com</p>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="col-lg-7">
        <form id="contactForm" class="php-email-form" data-aos="fade-up" data-aos-delay="200">
  <div class="row gy-4">

    <!-- First Name -->
    <div class="col-md-6">
      <input type="text" name="first_name" class="form-control" placeholder="First Name" required>
    </div>

    <!-- Last Name -->
    <div class="col-md-6">
      <input type="text" name="last_name" class="form-control" placeholder="Last Name" required>
    </div>

    <!-- Email -->
    <div class="col-md-6">
      <input type="email" name="email" class="form-control" placeholder="Email" required>
    </div>

    <!-- Mobile -->
    <div class="col-md-6">
      <input type="tel" name="mobile" class="form-control" placeholder="Mobile Number" required>
    </div>

    <!-- Location -->
    <div class="col-md-6">
      <input type="text" name="location" class="form-control" placeholder="Location" required>
    </div>

    <!-- Address -->
    <div class="col-md-6">
      <input type="text" name="address" class="form-control" placeholder="Address" required>
    </div>

    <!-- Message -->
    <div class="col-md-12">
      <textarea name="message" class="form-control" rows="6" placeholder="Message" required></textarea>
    </div>

    <!-- Submit -->
    <div class="col-md-12 text-center">
      <div class="loading" style="display:none;">Loading</div>
      <div class="error-message text-danger"></div>
      <div class="sent-message text-success" style="display:none;">Your message has been sent. Thank you!</div>
      <button type="submit">Send Message</button>
    </div>

  </div>
</form>

      </div>

    </div>
  </div>

</section>

  </main>

<footer id="footer" class="footer position-relative">

  <div class="container">
    <div class="row gy-5">

      <!-- Brand Section -->
      <div class="col-lg-4">
        <div class="footer-brand">
          <a href="index.html" class="logo d-flex align-items-center mb-3">
            <span class="sitename">PS Web Studio</span>
          </a>
          <p class="tagline">Crafting modern websites with creativity, performance, and user-first design.</p>

          <div class="d-flex align-items-center mt-4">
            <div class="social-links">
              <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
              <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
              <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
              <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>
      <!-- End Brand Section -->

      <!-- Quick Links -->
      <div class="col-lg-6">
        <div class="footer-links-grid">
          <div class="row">
            <div class="col-6 col-md-4">
              <h5>Company</h5>
              <ul class="list-unstyled">
                <li><a href="about.html">About Us</a></li>
                <li><a href="team.html">Our Team</a></li>
                <li><a href="careers.html">Careers</a></li>
                <li><a href="blog.html">Blog</a></li>
              </ul>
            </div>
            <div class="col-6 col-md-4">
              <h5>Services</h5>
              <ul class="list-unstyled">
                <li><a href="services.html">Web Development</a></li>
                <li><a href="services.html">UI/UX Design</a></li>
                <li><a href="services.html">SEO & Analytics</a></li>
                <li><a href="services.html">Performance Optimization</a></li>
              </ul>
            </div>
            <div class="col-6 col-md-4">
              <h5>Support</h5>
              <ul class="list-unstyled">
                <li><a href="help.html">Help Center</a></li>
                <li><a href="contact-us.php">Contact Us</a></li>
                <li><a href="privacy.html">Privacy Policy</a></li>
                <li><a href="terms.html">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- End Quick Links -->

      <!-- CTA -->
      <div class="col-lg-2">
        <div class="footer-cta">
          <h5>Let's Connect</h5>
          <a href="contact.html" class="btn btn-outline">Get in Touch</a>
        </div>
      </div>
      <!-- End CTA -->

    </div>
  </div>

  <!-- Footer Bottom -->
  <div class="footer-bottom">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="footer-bottom-content d-flex justify-content-between align-items-center flex-wrap">
            <p class="mb-0">© <span class="sitename">PS Web Studio</span> 2025. All rights reserved.</p>
            <p class="mb-0">Designed with ❤️ by <a href="#">PS Web Studio</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Footer Bottom -->

</footer>


  <!-- Scroll Top -->
  <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <!-- Preloader -->
  <!-- <div id="preloader">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div> -->

  <!-- Vendor JS Files -->
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/php-email-form/validate.js"></script>
  <script src="assets/vendor/aos/aos.js"></script>
  <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
  <script src="assets/vendor/purecounter/purecounter_vanilla.js"></script>
  <script src="assets/vendor/waypoints/noframework.waypoints.js"></script>
  <script src="assets/vendor/imagesloaded/imagesloaded.pkgd.min.js"></script>
  <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>

  <!-- Main JS File -->
  <script src="assets/js/main.js"></script>
  document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const form = this;
  const loading = form.querySelector('.loading');
  const error = form.querySelector('.error-message');
  const success = form.querySelector('.sent-message');

  loading.style.display = 'block';
  error.innerHTML = '';
  success.style.display = 'none';

  const formData = new FormData(form);

  fetch('forms/contact.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    loading.style.display = 'none';
    if(data.success){
      success.style.display = 'block';
      form.reset();
    } else {
      error.innerHTML = data.error || 'An error occurred, please try again.';
    }
  })
  .catch(() => {
    loading.style.display = 'none';
    error.innerHTML = 'An error occurred, please try again.';
  });
});

</body>

</html>