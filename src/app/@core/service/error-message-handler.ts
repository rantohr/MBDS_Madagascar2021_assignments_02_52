import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";

@Injectable({
    providedIn: 'any'
})
export class ErrorMessageHandler {
    constructor() { }

    getErrorMessageAsArray(error): String[] {
        let errorMessages = [];
        if (error.error) {
            if (typeof error.error === 'string' || error.error instanceof String) {
                errorMessages = [error.error]
            } else if (error.error.errors) {
                const errors = Object.keys(error.error.errors);
                errors.forEach(er => {
                    if (error.error.errors[er].message) errorMessages.push(`${error.error.errors[er].message}`)
                });
            } else if (error.error.error && error.error.error.message) {
                errorMessages = [`${error.error.error.message}`];
            } else if (error.error.error && error.error.message) {
                errorMessages = [`${error.error.message}`];
            }
        } else {
            errorMessages = [`Error Code: ${error.status}\nMessage: ${error.message}`];
        }
        return errorMessages;
    }

    getErrorMessageAsString(error): String {
        const errorMessages = this.getErrorMessageAsArray(error);
        let errorMessage: String = '';
        if (Array.isArray(errorMessages) && errorMessages.length) {
            if (errorMessages.length === 1) {
                errorMessage = errorMessages[0]
            } else {
                errorMessages.forEach(er => {
                    errorMessage = er ? `${errorMessage}.${er}\n` : errorMessage
                });
            }
        }
        return errorMessage;
    }

    getSingleErrorMessage(error) {
        const errorMessages = this.getErrorMessageAsArray(error)
        return (Array.isArray(errorMessages) && errorMessages.length) ? errorMessages[0] : undefined;
    }
}