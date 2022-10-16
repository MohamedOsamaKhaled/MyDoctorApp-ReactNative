export const SaveUser = (req, res) => {
    req.checkBody('name')
        .notEmpty()
        .withMessage('Name Require');

    req.checkBody('email')
        .notEmpty()
        .withMessage('email Require');

    req.checkBody('email')
        .isEmail()
        .withMessage('The formula is incorrect');

    req.checkBody('password')
        .notEmpty()
        .withMessage('Password Require');

    req.checkBody('userType')
        .notEmpty()
        .withMessage('User Type Require');
}