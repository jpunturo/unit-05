/*** 
	Calling the fetchData function to get 12 random users from the Random User Generator API.
***/
fetchData('https://randomuser.me/api/?results=12')
 	.then(data => displayUsers(data.results))

/*** 
	Fetch function to return data for a given URL.
***/
function fetchData(url) {
	return fetch(url)
				.then(checkStatus)
				.then(res => res.json())
				.catch(error => console.log('Oops! Looks like there is an error: ', error) );
}

/*** 
	Function to check the status of the response. It resolves or rejects the Promise.
***/
function checkStatus(response) {
	if (response.ok) {
		return (Promise.resolve(response));
	} else {
		return (Promise.reject(new Error(response.statusText)));
	}
}

/*** 
	Function to display users.
	Use the forEach function to loop over the data array and create a new gallery item for each users.
	When all gallery items have been displayed, the items variable catch all div cards. 
	A loop on the cards call the addModalToItems() function to create the modal for specific user.
***/
function displayUsers(data) {
	data.forEach(addGalleryItem);
	const items = document.querySelectorAll('.card');

	for(let i = 0; i < items.length; i++){
		addModalToItems(items[i], data[i]);
	}
}

/***
	Function to create a new gallery item for a given user
	and append it to the gallery div.
***/
function addGalleryItem(user, index) {
	const html = `
		<div class="card">
        	<div class="card-img-container">
            	<img class="card-img" src='${user.picture.large}' alt="profile picture">
            </div>
            <div class="card-info-container">
            	<h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
            	<p class="card-text">${user.email}</p>
            	<p class="card-text cap">${user.location.city}, ${user.location.state}</p>
        	</div>
    	</div>
	`;

	document.getElementById('gallery').innerHTML += html;
}

/***
	Function to add a click event listener on gallery cards, and creates modal to display more info about selected user.
	Call the setupCloseButton() function when a modal has been created to handle the close button.
***/
function addModalToItems(modal, user) {
	modal.addEventListener('click', () => {
		const html = `
			<div class="modal-container">
				<div class="modal">
					<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
					<div class="modal-info-container">
						<img class="modal-img" src='${user.picture.large}' alt="profile picture">
						<h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
						<p class="modal-text">${user.email}</p>
						<p class="modal-text cap">${user.location.city}, ${user.location.state}</p>
						<hr>
						<p class="modal-text">${user.cell}</p>
						<p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.country} ${user.location.postcode}</p>
						<p class="modal-text">Birthday: ${user.dob.date.slice(0,10)} </p>
					</div>
				</div>
			</div>
		`;
	
		document.querySelector('body').insertAdjacentHTML('beforeend', html);
		setupCloseButton();
	});
}

/***
	Function add a click event listener on the close button to close the modal.
***/
function setupCloseButton() {
    const itemModal = document.querySelector('.modal-container');
        
    document.getElementById('modal-close-btn').addEventListener('click', () => {
    	itemModal.style.display = 'none';
    	document.querySelector('body').removeChild(itemModal);
    });
}