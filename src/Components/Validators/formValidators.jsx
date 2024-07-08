import PasswordValidator from "password-validator"
var schema = new PasswordValidator();

// Add properties to it
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase(1)                              // Must have uppercase letters
    .has().lowercase(1)                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123', "Admin123", "Admin123456789"]); // Blacklist these values

export default function formValidators(e) {
    var { name, value } = e.target
    switch (name) {
        case "name":
        case "username":
        case "color":
            if (!value || value.length === 0)
                return name + " is Mendatory"
            else if (value.length < 3 || value.length > 50)
                return name + " Field Length Must Be 3-50"
            else
                return ""

        case "subject":
            if (!value || value.length === 0)
                return name + " is Mendatory"
            else if (value.length < 3 || value.length > 200)
                return name + " Field Length Must Be 3-200"
            else
                return ""

        case "email":
            if (!value || value.length === 0)
                return name + " is Mendatory"
            else if (value.length < 13 || value.length > 50)
                return name + " Field Length Must Be 13-50"
            else
                return ""

        case "password":
            if (!value || value.length === 0)
                return name + " is Mendatory"
            else if (schema.validate(value))
                return ""
            else
                return "Password must contains atleast 1 upper case character, 1 lower case character, 1 digit must conatins 8-100 characters"

        case "phone":
            if (!value || value.length === 0)
                return name + " is Mendatory"
            else if (value.length !== 10)
                return "Invalid Phone Number"
            else if (value.startsWith("6") || value.startsWith("7") || value.startsWith("8") || value.startsWith("9"))
                return ""
            else
                return "Invalid Phone Number"

        case "size":
            if (!value || value.length === 0)
                return name + " is Mendatory"
            else if (value.length > 10)
                return name + " Field Length Must Be 1-10"
            else
                return ""

        case "basePrice":
        case "quantity":
            if (!value || value.length === 0)
                return name + " is Mendatory"
            else if (value < 0)
                return name + " Field Value Must Be a Number Greater than 0"
            else
                return ""

        case "discount":
            if (!value || value.length === 0)
                return name + " is Mendatory"
            else if (value < 0 || value > 100)
                return "Product Discount Must Be Within 0-100"
            else
                return ""

        case "message":
            if (!value || value.length === 0)
                return name + " is Mendatory"
            else if (value.length < 50)
                return name + " Please Enter Atleast 50 Characters"
            else
                return ""

        default:
            return ""
    }
}
