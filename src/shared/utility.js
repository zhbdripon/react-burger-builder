export const updateObject = (oldObject,updatedProperties) =>{
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const checkValidity = (value, rules) =>{
    let valid = true;
    if (rules.required) {
        valid = valid && value.trim() !== '';
    }
    if (rules.minLength) {
        valid = valid && value.length >= rules.minLength
    }
    if (rules.maxLength) {
        valid = valid && value.length <= rules.maxLength
    }
    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        valid = valid && pattern.test(value)
    }
    return valid;
}