<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $product = $data['product'];
    $quantity = $data['quantity'];
    
    // Validate the input
    if(empty($product) || empty($quantity)) {
        echo json_encode(['message' => 'Product and quantity are required.']);
        exit;
    }

    // Prepare the email
    $to = 'navkartexfab@gmail.com'; // Replace with your email address
    $subject = 'New Enquiry from Navkar Tex Fab';
    $message = "Product: $product\nQuantity: $quantity metres";
    $headers = 'From: noreply@navkartexfab.com' . "\r\n" .
               'Reply-To: noreply@navkartexfab.com';

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['message' => 'Enquiry sent successfully!']);
    } else {
        echo json_encode(['message' => 'Failed to send enquiry.']);
    }
} else {
    echo json_encode(['message' => 'Invalid request method.']);
}
?>
