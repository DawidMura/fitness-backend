const register = async (e) => {
    // POST Request /register mit username und passwort
    // => Bei Erfolg sollte der Nutzer in das user-Array im Backend hinzugefügt werden
    e.preventDefault();
    const firstName = document.querySelector("#register-firstname").value;

    const lastName = document.querySelector("#register-lastname").value;

    const age = document.querySelector("#register-age").value;
    const ageToNum = parseInt(age);
    const password = document.querySelector("#register-password").value;
    const repassword = document.querySelector("#register-repassword").value;

    const email = document.querySelector("#register-email").value;

    const street = document.querySelector("#register-street").value;

    const number = document.querySelector("#register-number").value;
    const numberToNum = parseInt(number);


    const city = document.querySelector("#register-city").value;

    const zip = document.querySelector("#register-zip").value;
    const zipToNum = parseInt(zip);
    //try catch wäre sinnvoll
    const rawResponse = await fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            password: password,
            repassword: repassword,
            email: email,
            age: ageToNum,
            address: {
                street: street,
                number: numberToNum,
                city: city,
                zip: zipToNum
            }
        }),
    });

    const parsedResponse = await rawResponse.text();
    console.log({ parsedResponse });
};

const login = async (e) => {
    // POST Request /login mit username und passwort
    // => bei Erfolg sollte Client ein Cookie mit Acces-Token erhalten
    e.preventDefault();
    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#login-password").value;

    const rawResponse = await fetch("/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });

    const parsedResponse = await rawResponse.json();
    console.log({ parsedResponse });
};

const logout = async (e) => {
    // Post Request zu /logout, ohne daten/body
    // => Server soll einfach das Cookie löschen
    e.preventDefault();
    const rawResponse = await fetch("/logout", {
        method: "POST",
        credentials: "include",
    });

    const parsedResponse = await rawResponse.text(); // Antwort von Server (res.send({msg: "user registered"});)
    console.log({ parsedResponse });

    // Eingaben aus Fomular löschen
    document.querySelector(".login-form").reset();

    console.log("cookie deleted");
};

const getPosts = async () => {
    // GET Request zu /posts, ohne daten/body
    // (Die Nutzerinformationen vom eingeloggten User werden ja als
    // Access-Token im Cookie übermittelt )
    // => Server sollte uns die Posts als JSON im Array übergeben
    // => Die Posts sollten dann hier dem DOM hinzugefügt werden

    //...

    const rawResponse = await fetch("/posts", {
        method: "GET",
        credentials: "include",
        // cookies sollen mit Server ausgetausch werden
    });

    const posts = await rawResponse.json();

    // Beispiel, wie du die Posts zum Dom hinzufügen könntest
    const postDiv = document.querySelector("#posts");
    posts.forEach((post) => {
        const li = document.createElement("li");
        li.innerText = post.content;
        postDiv.appendChild(li);
    });
};
