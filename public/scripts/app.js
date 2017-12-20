(function() {
    var data;
    var singlePerson;
    var id;
    var body = document.querySelector('body');
    var overlay = document.querySelector('.overlay');
    var contacts = document.querySelector('.contacts');
    var contactItem = contacts.childNodes;
    var modal = document.querySelector('.contacts-modal');
    var contactInfo = document.querySelector('.contact-info');
    var successMessage = document.querySelector('.success-message-holder');
    var confirmMessage = document.querySelector('.confirmation-message-holder');
    var readmeMessage = document.querySelector('.readme-message-holder');

    var inputField = document.querySelectorAll('.input-field');
    var contactInput = document.querySelectorAll('.input-field input');
    var inputFirstName = document.getElementById('first-name');
    var inputLastName = document.getElementById('last-name');
    var inputMobileNumber = document.getElementById('mobile-number');
    var inputEmailAdress = document.getElementById('email-adress');

    var btnNew = document.querySelector('.btn-new');
    var btnAdd = document.querySelector('.btn-add');
    var btnClose = document.querySelector('.btn-close');
    var btnCloseInfo = document.querySelector('.btn-close-info');
    var btnCloseReadme = document.querySelector('.btn-close-readme');
    var btnUpdate = document.querySelector('.btn-update');
    var btnEdit = document.querySelector('.btn-edit');
    var btnRemove = document.querySelector('.btn-remove');
    var btnProceed = document.querySelector('.btn-proceed');
    var btnCancle = document.querySelector('.btn-cancle');
    var btnReadme = document.querySelector('.icon-readme');

    // --------------------------- //
    // Load contacts from database to DOM
    function loadContacts() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'index.php/api/contacts', true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                data = JSON.parse(xhr.responseText);
                var output = '';
                for (var i = 0; i < data.length; i++) {
                    output += '<li class="contact-item">' + data[i].first_name + ' ' + data[i].last_name + '</li>';
                }
                contacts.innerHTML = output;
                singlePerson = document.querySelectorAll('.contact-item');
                sortList();
                separateLetters();
                findA();
                personInfo();
                getContactId();
            }
        };
        xhr.send();
    }

    // Add contact to database
    function addContact(e) {
        e.preventDefault();

        // Get data from form and parse it as JSON
        var newContact = JSON.stringify({
            "first_name": inputFirstName.value,
            "last_name": inputLastName.value,
            "mobile_number": inputMobileNumber.value,
            "email_adress": inputEmailAdress.value
        });

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'index.php/api/contact/add', true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                successMessage.children[0].children[0].innerText = 'You have successfully added your new contact.';
                successMessage.classList.add('show');
                setTimeout(function() {
                    successMessage.classList.remove('show');
                }, 2000);
                loadNewContact();
            }
        };
        xhr.send(newContact);
    }

    // Remove contact from database
    function removeContact() {
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', 'index.php/api/contact/delete/' + id, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                closeConfirmMessage();
                successMessage.children[0].children[0].innerText = 'Your contact has been deleted successfully';
                successMessage.classList.add('show');
                setTimeout(function() {
                    successMessage.classList.remove('show');
                }, 2000);
                closeModalInfo();
                init();
            }
        };
        xhr.send();
    }

    // Update contact
    function updateContact(e) {
        e.preventDefault();

        // Get data from form and parse it as JSON
        var updatedContact = JSON.stringify({
            "first_name": inputFirstName.value,
            "last_name": inputLastName.value,
            "mobile_number": inputMobileNumber.value,
            "email_adress": inputEmailAdress.value
        });

        var xhr = new XMLHttpRequest();
        xhr.open('PUT', 'index.php/api/contact/update/' + id, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                successMessage.children[0].children[0].innerText = 'Your contact has been updated successfully';
                successMessage.classList.add('show');
                setTimeout(function() {
                    successMessage.classList.remove('show');
                }, 2000);
                closeModalInfo();
                loadNewContact();
            }
        };
        xhr.send(updatedContact);
    }

    // Edit existing contact
    function editContact() {
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == id) {
                inputFirstName.value = data[i].first_name;
                inputLastName.value = data[i].last_name;
                inputMobileNumber.value = data[i].mobile_number;
                inputEmailAdress.value = data[i].email_adress;
            }
        }
        inputHasValue();
        contactFormValdiation();
        btnAdd.classList.remove('show');
        btnUpdate.classList.add('show');
        openModal();
    }

    // Get contact names ID
    function getContactId() {
        for (var i = 0; i < singlePerson.length; i++) {
            singlePerson[i].addEventListener('click', function() {
                var clickedName = this.textContent;
                for (var i = 0; i < data.length; i++) {
                    var dbNames = data[i].first_name + ' ' + data[i].last_name;
                    if (clickedName == dbNames) {
                        id = data[i].id;
                    }
                }
            });
        }
        return id;
    }

    // Erease contact form and load new contact
    function loadNewContact() {
        inputFirstName.value = '';
        inputLastName.value = '';
        inputMobileNumber.value = '';
        inputEmailAdress.value = '';
        removeRequiredClasses();
        closeModal();
        init();
    }

    // Ask for confirmation before deleting the contact
    function deleteConfirm() {
        confirmMessage.classList.add('show');
    }

    // Show clicked person information
    function personInfo() {
        var contactInfoFirstName = contactInfo.children[0].children[1];
        var contactInfoLastName = contactInfo.children[1].children[1];
        var contactInfoMobileNumber = contactInfo.children[2].children[1];
        var contactInfoEmailAdress = contactInfo.children[3].children[1];

        for (var i = 0; i < singlePerson.length; i++) {
            singlePerson[i].addEventListener('click', function() {
                var clickedName = this.textContent

                for (var i = 0; i < data.length; i++) {
                    if (clickedName == (data[i].first_name + ' ' + data[i].last_name)) {
                        contactInfoFirstName.innerHTML = data[i].first_name;
                        contactInfoLastName.innerHTML = data[i].last_name;
                        contactInfoMobileNumber.innerHTML = data[i].mobile_number;
                        contactInfoMobileNumber.href = 'tel:' + data[i].mobile_number;
                        contactInfoEmailAdress.innerHTML = data[i].email_adress;
                        contactInfoEmailAdress.href = 'mailto:' + data[i].email_adress;
                    }
                }
                overlay.classList.add('show');
                contactInfo.classList.add('show');
            });
        }
    }

    // Put separator before every new letter
    function separateLetters() {
        for (let i = contactItem.length - 1; i > 0; i--) {
            var initialLetter = document.createElement('li');
            var firstLetter = contactItem[i].innerText.charAt(0).toUpperCase();
            var nextWordLetter = contactItem[i - 1].innerText.charAt(0).toUpperCase();
            initialLetter.className = 'initial-letter';

            if (firstLetter > nextWordLetter) {
                initialLetter.innerText = firstLetter;
                contacts.insertBefore(initialLetter, contactItem[i]);
            }
        }
    };

    // Put separator before first word
    function findA() {
        var firstWordLetter = contactItem[0].innerText.charAt(0);
        var initialLetter = document.createElement('li');
        initialLetter.className = 'initial-letter';
        initialLetter.innerText = firstWordLetter;

        if (firstWordLetter) {
            contacts.insertBefore(initialLetter, contactItem[0]);
        }
    }

    // Sort contact contacts by alphabetic order
    function sortList() {
        var switching, shouldSwitch, i, executed;

        executed = false;
        switching = true;
        // Make a loop that will continue until no switching has been done
        if (!executed) {
            while (switching) {
                // Start by saying: no switch is done
                switching = false;
                contactItem = contacts.childNodes;

                // Loop through single contacts
                for (var i = 0; i < contactItem.length - 1; i++) {
                    // Start by saying there should be no switching
                    shouldSwitch = false;
                    var currentName = contactItem[i].innerHTML.toUpperCase();
                    var nextName = contactItem[i + 1].innerHTML.toUpperCase();

                    // Check if the next item should switch place with the current item
                    // If the next name is alphabetically lower then current name, markas a switch and loop
                    if (currentName > nextName) {
                        shouldSwitch = true;
                        break;
                    }
                }
                // If a switch has been marked, make the switch and mark the switch as done
                if (shouldSwitch) {
                    contacts.insertBefore(contactItem[i + 1], contactItem[i]);
                    switching = true;
                } else {
                    executed = true;
                }
            }
        }
    }

    // Filter contacts by typing in search
    function filterContacts() {
        // Get value of input
        var filterValue = filterInput.value.toUpperCase();

        // Loop through contact-item lis
        for (var i = 0; i < contacts.childNodes.length; i++) {
            var reqContact = contacts.childNodes[i];
            var reqContactValue = reqContact.innerHTML.toUpperCase().indexOf(filterValue);

            // If match
            if (reqContactValue > -1) {
                reqContact.style.display = '';
                // separateLetters();
            } else {
                reqContact.style.display = 'none';
            }

            if (reqContact.classList.contains('initial-letter') && filterInput.value !== '') {
                reqContact.style.display = 'none';
            }
        }
    }

    // If contact form input has value, label stays up / active
    function inputHasValue() {
        for (var i = 0; i < contactInput.length; i++) {
            if (contactInput[i].value != '') {
                contactInput[i].parentNode.childNodes[3].classList.add('has-value')
                contactInput[i].parentNode.classList.remove('empty-input');
            } else {
                contactInput[i].parentNode.childNodes[3].classList.remove('has-value');
            }
        }
    }

    // Check if contact form input has value
    function checkInputValue() {
        for (var i = 0; i < contactInput.length; i++) {
            contactInput[i].addEventListener('input', function(evt) {
                inputHasValue();
            });
        }
    }

    // Remove required classes
    function removeRequiredClasses() {
        for (var i = 0; i < contactInput.length; i++) {
            contactInput[i].parentNode.childNodes[3].classList.remove('has-value');
        }
        for (var i = 0; i < inputField.length; i++) {
            inputField[i].classList.remove('empty-input');
        }
    }

    // if input is required, give its label a *
    function giveStarToLabel() {
        for (var i = 0; i < inputField.length; i++) {
            var inputFieldHasRequired = inputField[i].classList.contains('required');
            if (inputFieldHasRequired) {
                var star = inputField[i].children[1].children[0];
                star.innerHTML = '*';
            }
        }
    }

    // check if input has 'required' class
    function requiredFieldEmptyError() {
        for (var i = 0; i < inputField.length; i++) {
            var inputFieldHasRequired = inputField[i].classList.contains('required');
            var emptyInput = inputField[i].children[0].value;
            if (inputFieldHasRequired && emptyInput == '') {
                inputField[i].classList.add('empty-input');
            }
        }
    }

    // Check form validation
    function contactFormValdiation() {
        if ((inputFirstName.value === '') || (inputLastName.value === '') || (inputMobileNumber.value === '') || (inputEmailAdress.value === '')) {
            btnAdd.classList.add('disabled');
            btnAdd.disabled = true;
            btnUpdate.classList.add('disabled');
            btnUpdate.disabled = true;
            requiredFieldEmptyError();
        } else {
            btnAdd.classList.remove('disabled');
            btnAdd.disabled = false;
            btnUpdate.classList.remove('disabled');
            btnUpdate.disabled = false;
        }
    }

    // Hide contact form
    function closeModal() {
        modal.classList.remove('show');
        btnAdd.classList.remove('show');
        btnUpdate.classList.remove('show');
        inputFirstName.value = '';
        inputLastName.value = '';
        inputMobileNumber.value = '';
        inputEmailAdress.value = '';
        inputHasValue();
    }

    // Hide contact information
    function closeModalInfo() {
        overlay.classList.remove('show');
        contactInfo.classList.remove('show');
    }

    // Hide confirmation message
    function closeConfirmMessage() {
        confirmMessage.classList.remove('show');
    }

    // Hide contact form if ESC is pressed
    function closeModalWithESC(e) {
        if (e.which == 27 || e.keyCode == 27) {
            closeModal();
        }
    }

    // Hide contact information
    function closeContactInfo() {
        contactInfo.classList.remove('show');
    }

    // Show contact form
    function openModal() {
        btnAdd.classList.add('disabled');
        btnAdd.disabled = true;
        btnUpdate.classList.add('disabled');
        btnUpdate.disabled = true;
        modal.classList.add('show');
    }

    // Function to close modal if outside click
    function outsideClick(e) {
        if (e.target == modal) {
            closeModal();
        }
        if (e.target == overlay) {
            closeModalInfo();
        }
    }

    // Toggle readme message
    function toggleReadme() {
        readmeMessage.classList.toggle('show');
    }

    // Initialize Application
    function init() {
        loadContacts();
        checkInputValue();
        giveStarToLabel();
    }

    // --------------------------- //
    // Initialize Application
    init();
    // Filter contacts by typing (serach)
    filterInput.addEventListener('keyup', filterContacts);
    // Add click listener to close button;
    btnClose.addEventListener('click', closeModal);
    // Add click listener to close button info;
    btnCloseInfo.addEventListener('click', closeModalInfo);
    // Add click listener to close confirmation message;
    btnCancle.addEventListener('click', closeConfirmMessage);
    // Add click listener to new contact button;
    btnNew.addEventListener('click', function() {
        btnUpdate.classList.remove('show');
        btnAdd.classList.add('show');
        openModal();
    });
    // Add contact to database and contact list
    btnAdd.addEventListener('click', addContact);
    // Remove contact from database and contact list
    btnProceed.addEventListener('click', removeContact);
    // Ask form confirmation to remoce the contact from database
    btnRemove.addEventListener('click', deleteConfirm);
    // Edit existing contact
    btnEdit.addEventListener('click', editContact);
    // Update existing contact
    btnUpdate.addEventListener('click', updateContact);
    // Show - hide readme message
    btnReadme.addEventListener('click', toggleReadme);
    btnCloseReadme.addEventListener('click', toggleReadme);
    // Close modal with ESC
    document.addEventListener('keydown', closeModalWithESC);
    // Listen for outside click
    window.addEventListener('click', outsideClick);
    // window.addEventListener('click', outsideClick);
    // Checking form fill by typing
    for (var i = 0; i < contactInput.length; i++) {
        contactInput[i].addEventListener('input', contactFormValdiation);
    }
})();