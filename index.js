
window.addEventListener('DOMContentLoaded', loadData);

const form = document.querySelector('form');
let bookings = 0;
const bookingNum = parseInt(document.querySelector('#bookingNum').textContent);
const nothing = document.querySelector('#nothing');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const userName = event.target.userName.value;
  const seatNumber = event.target.seatNumber.value;
  const object = {
    userName,
    seatNumber
    }

    function isSeatAlreadyBooked(seatNumber, bookings) {
        return bookings.some(booking => booking.seatNumber === seatNumber);
    }

    axios.get("https://crudcrud.com/api/76f2d4ad049141698250faadd601f742/bookingData")
        .then((response) => {
            const existingBookings = response.data;

            if (isSeatAlreadyBooked(seatNumber, existingBookings)) {
                alert("Already Booked!");
            } else {
                post(object);
            }
        })
        .catch((error) => {
            console.log(error);
        });

  function post(obj) {
    axios.post("https://crudcrud.com/api/76f2d4ad049141698250faadd601f742/bookingData", {
        userName : obj.userName,
        seatNumber : obj.seatNumber
    })
    .then((response) => {
        displayData(response.data);
        console.log(response)
    })
    .catch((error) => {
        console.log(error);
    })
  }
  
  event.target.reset();
  
})

function displayData(obj) {
    const newHeading = document.createElement('h3');
    const slotNum = document.createElement('span');
    newHeading.textContent = obj.userName + " ";
    slotNum.textContent = obj.seatNumber;
    slotNum.className = 'search';

    newHeading.appendChild(slotNum);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    bookings += 1;
    document.querySelector('#bookingNum').textContent = bookings;

    //delete functionality
    delBtn.onclick = (event) => {
        list.removeChild(event.target.parentElement);
        axios.delete(`https://crudcrud.com/api/76f2d4ad049141698250faadd601f742/bookingData/${obj._id}`)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
        bookings -= 1;
        document.querySelector('#bookingNum').textContent = bookings;
    }

    //edit functionality
    editBtn.onclick = (event) => {
        document.querySelector('#userName').value = obj.userName;
        document.querySelector('#seatNumber').value = obj.seatNumber;
        list.removeChild(event.target.parentElement);
        axios.delete(`https://crudcrud.com/api/76f2d4ad049141698250faadd601f742/bookingData/${obj._id}`)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
        bookings -= 1;
        document.querySelector('#bookingNum').textContent = bookings;
    }

    newHeading.appendChild(delBtn);
    newHeading.appendChild(editBtn);
    
    const list = document.querySelector('#list');
    nothing.style.display = 'none';

    list.appendChild(newHeading);
}

// filter functionality
const filter = document.getElementById('filter');

filter.addEventListener('keyup', function(event) {
    const textEntered = event.target.value.toLowerCase();
    const slots = document.getElementsByClassName('search');
    let flag = false;

    for (let i = 0; i < slots.length; i++) {
        const text = slots[i].textContent.toLowerCase();
        if (text.indexOf(textEntered) === -1) {
            slots[i].parentElement.style.display = 'none';
        } else {
            slots[i].parentElement.style.display = '';
            flag = true;
        }
    }
    if(flag) {
        nothing.style.display = 'none'
    }
    else {
        nothing.style.display = 'block'
    }
});

function loadData() {
    axios.get("https://crudcrud.com/api/76f2d4ad049141698250faadd601f742/bookingData")
    .then((response) => {
        response.data.forEach((user) => {
            displayData(user);
            document.querySelector('#bookingNum').textContent = response.data.length;
                
        });
    })
    .catch((error) => {
            console.log(error);
    })
}




    


