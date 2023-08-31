enum Role {
  Admin,
  Talent,
  Agent,
  Director,
}
function isString(target: any, propertyKey: string) {
  let value: string;
  Object.defineProperty(target, propertyKey, {
    get: () => value,
    set: (newValue: string) => {
      if (typeof newValue !== "string" || newValue === "") {
        throw Error(`Value is not correct for ${propertyKey}`);
      } else {
        value = newValue;
      }
    },
    configurable: true,
  });
}
function isEmail(target: any, propertyKey: string) {
  let value: string;
  Object.defineProperty(target, propertyKey, {
    get: () => value,
    set: (newValue: string) => {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newValue)) {
        throw Error(`Value is not correct for ${propertyKey}`);
      } else {
        value = newValue;
      }
    },
    configurable: true,
  });
}

function minLength(length: number) {
  return function (target: any, propertyKey: string) {
    let value: string;
    Object.defineProperty(target, propertyKey, {
      get: () => value,
      set: (newValue) => {
        if (newValue.length < length) {
          throw Error(`Value is not correct for : ${propertyKey}`);
        } else {
          value = newValue;
        }
      },
      configurable: true,
    });
  };
}

function getResponseTime(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const appMethod = descriptor.value;
  descriptor.value = async function (...args: any[]) {
    console.time(propertyKey);
    const data = await appMethod.call(this, args);
    console.timeEnd(propertyKey);
    return data;
  };
  return descriptor;
}

function Authorization(allowedRoles: Role[]) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.value = function (...args: any[]) {
      if (allowedRoles.includes(User.getUserRole())) {
        console.log("You are authorized");
      } else {
        throw Error(`You are not authorized for ${propertyKey}`);
      }
    };
    return descriptor;
  };
}

function logginRequired(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const appMethod = descriptor.value;
  descriptor.value = function (this: User, ...args: any[]) {
    if (!this.getIsLoggedIn()) {
      throw new Error(`User must be logged in to access ${propertyKey}.`);
    }
    return appMethod.apply(this, args);
  };
  return descriptor;
}

class User {
  private isLoggedIn: boolean = false;

  @isString
  name: string;

  @isEmail
  @isString
  email: string;

  @minLength(8)
  password: string;

  static currentUserRole = Role.Talent;

  static getUserRole() {
    return User.currentUserRole;
  }

  static setUserRole(role: Role) {
    User.currentUserRole = role;
  }

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  @getResponseTime
  async fetchData() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = res.json();
    return data;
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

  @logginRequired
  editProfile(newName: string) {
    this.name = newName;
    console.log("You can edit this profile");
  }

  @Authorization([Role.Admin, Role.Director])
  createRole() {
    console.log("Role is created");
  }
  @Authorization([Role.Admin])
  createUser() {
    console.log("User is created");
  }
}

const user = new User("test", "ag@gmail.com", "12345678");

user.editProfile("newName");

user.fetchData().then((res) => {
  console.log(res);
});
