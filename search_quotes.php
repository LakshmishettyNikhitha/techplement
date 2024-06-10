<?php
header('Content-Type: application/json');

$author = isset($_GET['author']) ? urlencode($_GET['author']) : '';

if (empty($author)) {
    echo json_encode([]);
    exit();
}

// Fetch quotes by author from the Quotable API
$apiUrl = "https://api.quotable.io/quotes?author=$author";

$response = file_get_contents($apiUrl);
if ($response === FALSE) {
    // Handle error
    echo json_encode(["error" => "Unable to fetch quotes"]);
    exit();
}

$quotesData = json_decode($response, true);
$quotes = array_map(function($quote) {
    return [
        "author" => $quote['author'],
        "quote" => $quote['content']
    ];
}, $quotesData['results']);

echo json_encode($quotes);
?>
