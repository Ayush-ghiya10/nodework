"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Role;
(function (Role) {
    Role[Role["Admin"] = 0] = "Admin";
    Role[Role["Talent"] = 1] = "Talent";
    Role[Role["Agent"] = 2] = "Agent";
    Role[Role["Director"] = 3] = "Director";
})(Role || (Role = {}));
function isString(target, propertyKey) {
    let value;
    Object.defineProperty(target, propertyKey, {
        get: () => value,
        set: (newValue) => {
            if (typeof newValue !== "string" || newValue === "") {
                throw Error(`Value is not correct for ${propertyKey}`);
            }
            else {
                value = newValue;
            }
        },
        configurable: true,
    });
}
function isEmail(target, propertyKey) {
    let value;
    Object.defineProperty(target, propertyKey, {
        get: () => value,
        set: (newValue) => {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newValue)) {
                throw Error(`Value is not correct for ${propertyKey}`);
            }
            else {
                value = newValue;
            }
        },
        configurable: true,
    });
}
function minLength(length) {
    return function (target, propertyKey) {
        let value;
        Object.defineProperty(target, propertyKey, {
            get: () => value,
            set: (newValue) => {
                if (newValue.length < length) {
                    throw Error(`Value is not correct for : ${propertyKey}`);
                }
                else {
                    value = newValue;
                }
            },
            configurable: true,
        });
    };
}
function getResponseTime(target, propertyKey, descriptor) {
    const appMethod = descriptor.value;
    descriptor.value = function (...args) {
        return __awaiter(this, void 0, void 0, function* () {
            console.time(propertyKey);
            const data = yield appMethod.call(this, args);
            console.timeEnd(propertyKey);
            return data;
        });
    };
    return descriptor;
}
function Authorization(allowedRoles) {
    return function (target, propertyKey, descriptor) {
        descriptor.value = function (...args) {
            if (allowedRoles.includes(User.getUserRole())) {
                console.log("You are authorized");
            }
            else {
                throw Error(`You are not authorized for ${propertyKey}`);
            }
        };
        return descriptor;
    };
}
function logginRequired(target, propertyKey, descriptor) {
    const appMethod = descriptor.value;
    descriptor.value = function (...args) {
        if (!this.getIsLoggedIn()) {
            throw new Error(`User must be logged in to access ${propertyKey}.`);
        }
        return appMethod.apply(this, args);
    };
    return descriptor;
}
class User {
    static getUserRole() {
        return User.currentUserRole;
    }
    static setUserRole(role) {
        User.currentUserRole = role;
    }
    constructor(name, email, password) {
        this.isLoggedIn = false;
        this.name = name;
        this.email = email;
        this.password = password;
    }
    fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch("https://jsonplaceholder.typicode.com/posts");
            const data = res.json();
            return data;
        });
    }
    login() {
        this.isLoggedIn = true;
    }
    logout() {
        this.isLoggedIn = false;
    }
    getIsLoggedIn() {
        return this.isLoggedIn;
    }
    editProfile(newName) {
        this.name = newName;
        console.log("You can edit this profile");
    }
    createRole() {
        console.log("Role is created");
    }
    createUser() {
        console.log("User is created");
    }
}
User.currentUserRole = Role.Talent;
__decorate([
    isString
], User.prototype, "name", void 0);
__decorate([
    isEmail,
    isString
], User.prototype, "email", void 0);
__decorate([
    minLength(8)
], User.prototype, "password", void 0);
__decorate([
    getResponseTime
], User.prototype, "fetchData", null);
__decorate([
    logginRequired
], User.prototype, "editProfile", null);
__decorate([
    Authorization([Role.Admin, Role.Director])
], User.prototype, "createRole", null);
__decorate([
    Authorization([Role.Admin])
], User.prototype, "createUser", null);
const user = new User("test", "ag@gmail.com", "12345678");
user.editProfile("newName");
user.fetchData().then((res) => {
    console.log(res);
});
