
  async function signup(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = parseInt(document.getElementById("age").value);
    const location = document.getElementById("location").value.trim();
    const bio = document.getElementById("bio").value.trim();

    const message = document.getElementById("signupMessage");

    if (age < 18) {
        message.textContent =
            "You must be 18 or older to join Motswalle.";
        return;
    }

    const email = prompt("Enter your email address:");
    const password = prompt(
        "Create a password (minimum 6 characters):"
    );

    if (!email || !password) {
        message.textContent =
            "Email and password are required.";
        return;
    }

    message.textContent = "Creating your account...";

    const { data, error } =
        await supabaseClient.auth.signUp({
            email: email,
            password: password
        });

    if (error) {
        message.textContent = error.message;
        return;
    }

    const user = data.user;

    if (!user) {
        message.textContent =
            "Check your email to confirm your account.";
        return;
    }

    const { error: profileError } =
        await supabaseClient
            .from("profiles")
            .insert({
                id: user.id,
                name: name,
                age: age,
                location: location,
                bio: bio
            });

    if (profileError) {
        message.textContent =
            profileError.message;
        return;
    }

    message.textContent =
        "Account created successfully! ❤️";

    event.target.reset();
}

