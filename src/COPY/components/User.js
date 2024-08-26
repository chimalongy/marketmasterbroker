
const User = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    registrationDate: "",
    accountStatus: "",
    maxTransaction: "",
    transactionsThisMonth: 0,
    AllTransactions: [],
    loadUserData:"http://localhost/coinvestEngine/loadUserData.php",



    loadUserData: function (email, engine) {
        const formData = new FormData();

        formData.append('email', email);




        fetch(engine, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.text())
            .then(data => {
                // console.log(data); // Log the response data to the console
                const result = data;
                console.log(result)

            })
            .catch(error => {
                console.error(error);
                alert('An error occurred while sending the data.');
            });

    }




}

User.getUserData.loadUserData();