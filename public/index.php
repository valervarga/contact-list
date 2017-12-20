<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
require '../src/config/db.php';

$app = new \Slim\App;

// Get Homepage
$app->get('/', function (Request $request, Response $response) {
  require 'pages/home.php';
});

// Get All Contacts
$app->get('/api/contacts', function(Request $request, Response $response) {
  $sql = "SELECT * FROM contacts";

  try {
    // Get DB Object
    $db = new db();
    // Connect
    $db = $db->connect();

    $stmt = $db->query($sql);
    $contacts = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($contacts);
  } catch(PDOException $e) {
    echo '{"error": {"text": '.$e->getMessage().'}}';
  }
});

// Get Single Contact
$app->get('/api/contact/{id}', function(Request $request, Response $response) {
  $id = $request->getAttribute('id');
  $sql = "SELECT * FROM contacts WHERE id = $id";

  try {
    // Get DB Object
    $db = new db();
    // Connect
    $db = $db->connect();

    $stmt = $db->query($sql);
    $contact = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($contact);
  } catch(PDOException $e) {
    echo '{"error": {"text": '.$e->getMessage().'}}';
  }
});

// Add Contacts
$app->post('/api/contact/add', function(Request $request, Response $response) {
  $first_name = $request->getParam('first_name');
  $last_name = $request->getParam('last_name');
  $mobile_number = $request->getParam('mobile_number');
  $email_adress = $request->getParam('email_adress');

  $sql = "INSERT INTO contacts (first_name,last_name,mobile_number,email_adress) VALUES
  (:first_name,:last_name,:mobile_number,:email_adress)";
  try {
    // Get DB Object
    $db = new db();
    // Connect
    $db = $db->connect();

    $stmt = $db->prepare($sql);

    $stmt->bindParam(':first_name', $first_name);
    $stmt->bindParam(':last_name', $last_name);
    $stmt->bindParam(':mobile_number', $mobile_number);
    $stmt->bindParam(':email_adress', $email_adress);

    $stmt->execute();

    echo '{"notice": {"text": "Contact Added"}}';
  } catch(PDOException $e) {
    echo '{"error": {"text": '.$e->getMessage().'}}';
  }
});

// Update Contacts
$app->put('/api/contact/update/{id}', function(Request $request, Response $response) {
  $id = $request->getAttribute('id');
  $first_name = $request->getParam('first_name');
  $last_name = $request->getParam('last_name');
  $mobile_number = $request->getParam('mobile_number');
  $email_adress = $request->getParam('email_adress');

  // $sql = "INSERT INTO contacts (first_name,last_name,mobile_number,email_adress) VALUES
  // (:first_name,:last_name,:mobile_number,:email_adress)";
  $sql = "UPDATE contacts SET
          first_name = :first_name,
          last_name = :last_name,
          mobile_number = :mobile_number,
          email_adress = :email_adress
        WHERE id = $id";

  try {
    // Get DB Object
    $db = new db();
    // Connect
    $db = $db->connect();

    $stmt = $db->prepare($sql);

    $stmt->bindParam(':first_name', $first_name);
    $stmt->bindParam(':last_name', $last_name);
    $stmt->bindParam(':mobile_number', $mobile_number);
    $stmt->bindParam(':email_adress', $email_adress);

    $stmt->execute();

    echo '{"notice": {"text": "Contact Updated"}}';
  } catch(PDOException $e) {
    echo '{"error": {"text": '.$e->getMessage().'}}';
  }
});

// Delete Contact
$app->delete('/api/contact/delete/{id}', function(Request $request, Response $response) {
  $id = $request->getAttribute('id');
  $sql = "DELETE FROM contacts WHERE id = $id";
  
  try {
    // Get DB Object
    $db = new db();
    // Connect
    $db = $db->connect();
    
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $db = null;
    echo '{"error": {"text": "Contact Deleted"}}';
  } catch(PDOException $e) {
    echo '{"error": {"text": '.$e->getMessage().'}}';
  }
});

$app->run();