
const MSG_IS_EMPTY = "The field can't be empty";
const MSG_MAX_LENGTH = "The length cannot be greater than %d";
// const MSG_IS_EMAIL = "Need to be a valid email";
// const MSG_IS_NUMBER = "Need to beed a number";

class FieldValidation {

    errors = [];
    value = '';
    name = '';
    constraints = [];

    constructor(field) {
        this.value = field.value;
        this.name = field.name;
        this.constraints = field.constraints;
        this.check();
    }

    check() {
        for (const [constraintName, constraintValue] of Object.entries(this.constraints)) {
            if (constraintName === 'required' && constraintValue === true) {
                this.isEmpty(this.value, constraintName);
            }
            if (constraintName === 'maxLength' && Number.isInteger(constraintValue)) {
                this.maxLength(this.value, constraintName, constraintValue);
            }
        }
    }

    isEmpty(fieldValue, constraintName) {
        if (fieldValue === '') {
            this.errors.push({name: constraintName, value: MSG_IS_EMPTY});
        }
    }

    maxLength(fieldValue, constraintName, contraintValue) {
        if (fieldValue.length > contraintValue) {
            this.errors.push({name: constraintName, value: MSG_MAX_LENGTH.replace('%d', contraintValue)});
        }
    }

    hasErrors() {
        return Object.keys(this.errors).length > 0;
    }

    getErrors() {
        return this.errors;
    }
}

export default FieldValidation;
