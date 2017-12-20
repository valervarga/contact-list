<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="format-detection" content="telephone=yes">

  <link href="https://fonts.googleapis.com/css?family=Hind:300,400,700" rel="stylesheet">
  <link rel="stylesheet" href="stylesheets/style.css">
  <title>Filterable List</title>
</head>

<body>
  <div class="container">
    <span class="icon-readme">&quest;&excl;</span>
    <h1>contact<span>list<span></h1>
    <h2>A simple contact list app built with MySQL, PHP and Vanilla Javascript</h2>

    <form name="contacts-modal" class="contacts-modal" method="post">
      <div class="add-contacts-holder">
        <span class="btn-close">&times;</span>
        <div class="input-field col required">
          <input autocomplete="off" name='first_name' id="first-name" type="text">
          <label for="first-name">First Name <span></span></label>
        </div>
        <div class="input-field col required">
          <input autocomplete="off" name="last_name" id="last-name" type="text">
          <label for="last-name">Last Name <span></span></label>
        </div>
        <div class="input-field col required">
          <input autocomplete="off" name="mobile_number" id="mobile-number" type="text">
          <label for="mobile-number">Mobile Number (with country code)<span></span></label>
        </div>
        <div class="input-field col required">
          <input autocomplete="off" name="email_adress" id="email-adress" type="email" required>
          <label for="email-adress">Email Adress <span></span></label>
        </div>
        <button class="btn btn-add" type="submit" name="sbumit" id="submit">
          Add <span class="plus">&plus;</span>
        </button>
        <button class="btn btn-update" type="submit" name="sbumit" id="submit">
          Update <span class="plus">&plus;</span>
        </button>
      </div>
    </form>

    <div class="search-holder">
      <input type="text" id="filterInput" class="input-search" placeholder="Search names...">
      <button class="btn btn-new">
        <span class="plus">&plus;</span>
        Add New Contact
      </button>
    </div>

    <div class="content clearfix">
      <ul class="contacts"></ul>

      <div class="overlay"></div>

      <div class="contact-info">
        <li>
          <p>First Name: </p>
          <h4></h4>
        </li>
        <li>
          <p>Last Name: </p>
          <h4></h4>
        </li>
        <li>
          <p>Mobile Phone: </p>
          <a href="tel:"></a>
        </li>
        <li>
          <p>Email Addres: </p>
          <a href="mailto:"></a>
        </li>
        <span class="btn-close-info">&times;</span>
        <li>
          <ul class="button-holder">
            <li>
              <button class="btn btn-edit">
                <span class="plus">&plus;</span>
                Edit Contact
              </button>
            </li>
            <li>
              <button class="btn btn-remove">
                <span class="plus">&plus;</span>
                Remove Contact
              </button>
            </li>
          </ul>
        </li>
      </div>
    </div>

    <div class="success-message-holder">
      <div class="success-message">
        <p></p>
      </div>
    </div>
  </div>
  
  <div class="confirmation-message-holder">
    <div class="confirmation-message">
      <p>Are you sure you want to delete this contact? This operation will delete the contact permanently.</p>
      <div class="button-holder">
        <button class="btn btn-proceed">Proceed</button>
        <button class="btn btn-cancle">Cancel</button>
      </div>
    </div>
  </div>

  <div class="readme-message-holder">
    <div class="readme-message">
      <span class="btn-close-readme">&times;</span>
      <p>This is a simple contact list(ish) application, made by MySQL, PHP and Javascript.</p>
      <p>You can add, remove and update contacts or view their details, if you click on the persons name. The application does not have too much details and functions. It could be probably modified, but I did not want to overcomplicate it.</p>
      <p>My main goal was to play around a bit by using pure JavaScript. I did not intend to import any JS library or framework. Also to make a CRUD app with PHP and MySQL.</p>
      <p>I would be pleased if you would test it out. Add, edit or remove contacts, but PLEASE don't delete all of them. :)</p>
      <p>WARNING! You can add you personal information, but your data will be public and i do not take any responsibilities about it's safety.</p>
    </div>
  </div>

  <script type="text/javascript" src="scripts/app.js"></script>
</body>

</html>
