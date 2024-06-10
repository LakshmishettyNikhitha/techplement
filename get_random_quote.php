<?php
header('Content-Type: application/json');

// Fetch a random quote from the Quotable API
$apiUrl = 'https://api.quotable.io/random';

$response = file_get_contents($apiUrl);
if ($response === FALSE) {
    // Handle error
    echo json_encode(["error" => "Unable to fetch quote"]);
    exit();
}

$quoteData = json_decode($response, true);
$quote = [
    "author" => $quoteData['author'],
    "quote" => $quoteData['content']
];

echo json_encode($quote);
?>
