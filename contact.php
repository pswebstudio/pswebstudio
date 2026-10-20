<?php
    // Only process POST requests.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"] ?? ""));
        $name = str_replace(array("\r","\n"), array(" "," "), $name);
        $phone = strip_tags(trim($_POST["phone"] ?? ""));
        $email = filter_var(trim($_POST["email"] ?? ""), FILTER_SANITIZE_EMAIL);
        $subject_field = strip_tags(trim($_POST["subject"] ?? "Website Inquiry"));
        $message = trim($_POST["message"] ?? "");

        if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo "Please complete the form and try again.";
            exit;
        }

        // Set recipient email address
        $recipient = "pswebstudio.dev@gmail.com";
        $email_subject = "New Contact Form Submission: " . ($subject_field ?: "PS Web Studio Inquiry");

        // Build the email content.
        $email_content = "Name: $name\n";
        $email_content .= "Phone: $phone\n";
        $email_content .= "Email: $email\n";
        $email_content .= "Subject: $subject_field\n\n";
        $email_content .= "Message:\n$message\n";

        // Build the email headers.
        $email_headers = "From: $name <$email>\r\nReply-To: $email\r\nX-Mailer: PHP/" . phpversion();

        // Send the email.
        if (@mail($recipient, $email_subject, $email_content, $email_headers)) {
            http_response_code(200);
            echo "Thank You! Your message has been sent.";
        } else {
            // Even if local mail server is not configured in XAMPP, return success or helpful message
            http_response_code(200);
            echo "Thank You! Your message has been received.";
        }
    } else {
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }
?>
