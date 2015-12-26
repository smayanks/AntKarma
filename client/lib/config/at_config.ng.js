
T9n.map('en', {
        error: {
            accounts: {
                'Login forbidden': 'Invalid login credentials!'
            }
        }
});

var mySubmitFunc = function(error, state){
  if (!error) {
    if (state === "signIn") {
      // Successfully logged in
      // ...
      // $state.go('home');
    }
    if (state === "signUp") {
      // Successfully registered
      // ...
      // $state.go('home');
    }
    Session.set('firstTimeLoginFlag', true);
  }
};

AccountsTemplates.addField({
    _id: 'username',
    type: 'text',
    required: true
});

AccountsTemplates.configure({
 onSubmitHook: mySubmitFunc,
 sendVerificationEmail: true,
 showForgotPasswordLink: true,
 // showResendVerificationEmailLink: true,
 continuousValidation: true,

  // Redirects
  homeRoutePath: '/home',
  redirectTimeout: 4000,
  overrideLoginErrors: false,
  // forbidClientAccountCreation: true,
	texts: {
	    errors: {
	        accountsCreationDisabled: "Client side accounts creation is disabled!!!",
	        cannotRemoveService: "Cannot remove the only active service!",
	        captchaVerification: "Captcha verification failed!",
	        loginForbidden: "error.accounts.Invalid username or password!",
	        mustBeLoggedIn: "error.accounts.Must be logged in",
	        pwdMismatch: "Passwords do not match. Try again!",
	        validationErrors: "Validation Errors",
	        verifyEmailFirst: "Please verify your email first. Check the email and follow the link!",
	    },
      info: {
            emailSent: "info.emailSent",
            emailVerified: "info.emailVerified",
            pwdChanged: "info.passwordChanged",
            pwdReset: "info.passwordReset",
            pwdSet: "info.passwordReset",
            signUpVerifyEmail: "Successful Registration! Please check your email and follow the instructions.",
            verificationEmailSent: "A new email has been sent to you. If the email doesn't show up in your inbox, be sure to check your spam folder.",
        },
        inputIcons: {
          isValidating: "fa fa-spinner fa-spin",
          hasSuccess: "fa fa-check",
          hasError: "fa fa-times",
      }
	}
});




