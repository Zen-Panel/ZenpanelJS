# ZenpanelJS
 NPM Package for Zen Panel

# Become a patron
Wanna join the crab family? And support the crab king and his projects?

By becoming a patron of the crab family you will get

 - Access to the crab family's discord server
 - Early access to new projects
 - Access to get commissions directly from the crab king him self

 Become a patron now! [Click here ;D](https://www.patreon.com/crabzzai)

# Getting started
```js
 const ZenAPIJS = require('zenapijs').default;
 const ZenAPI = new ZenAPIJS('https://api.zen-panel.net');
```

# Overview
## [FTP](#ftp)
  * [Authenticate the FTP user](#authenticate-the-ftp-user)
  * [Create a new FTP user](#create-a-new-ftp-user)
  * [Get all created FTP users of service](#get-all-created-ftp-users-of-service)
## [Service](#service)
  * [Authenticate access for the service](#authenticate-access-for-the-service)
  * [Get service data](#get-service-data)
  * [Control service](#control-service)
  * [Send command to the service](#send-command-to-the-service)

# Ftp
## Authenticate the FTP user
```js
// Secret code for the selected daemon
var daemon_secret_code = '04fefc50-1518-4968-bd89-2b99a3941a6c';

// FTP user credentials
var credentials = {
    username: '605cc7d7bc733dae5dab1430',
    password: 'HEPzVLnZVuhyYdDmudpP1FmNq7YDPnQO'
};

ZenAPI.ftp().authenticateUser(daemon_secret_code, credentials.username, credentials.password).then(data => {
    console.log(data);
    /*
    {
        "path": "/",
        "serviceId": "605cdd28bc733dae5dab1433"
    }
    */
}).catch(err => {
    console.log(err);
    /*
    {
        "error": {
            "message": "Not authorized."
        }
    }
    */
});
```

## Create a new FTP user
```js
// User authentication code
var auth_code = 'ca221d77-6408-471f-af7f-c370f0bad562';

// Body content
var content = {
    serviceId: '605cdd28bc733dae5dab1433',
    path: '/plugins/',
    daemon: 'daemon01'
};

ZenAPI.ftp().newFtpUser(auth_code, content).then(data => {
    console.log(data);
    /*
    {
        "message": "Created a new FTP user."
    }
    */
}).catch(err => {
    console.log(err);
    /*
    {
        "error": {
            "message": "Not authorized."
        }
    }
    */
});
```

## Get all created FTP users of service
```js
// User authentication code
var auth_code = 'ca221d77-6408-471f-af7f-c370f0bad562';

// Service ID of the requested service
var serviceId = '605cdd28bc733dae5dab1433';

ZenAPI.ftp().getAllUsers(auth_code, serviceId).then(data => {
    console.log(data);
    /*
    [
        {
            "username": "605cc7d7bc733dae5dab1430",
            "password": "HEPzVLnZVuhyYdDmudpP1FmNq7YDPnQO",
            "path": "/"
        },
        {
            "username": "605def9c83b75a61c804dcd7",
            "password": "hX7CvC0vRvZEIOi6ohjQO15gUlAsXaqX",
            "path": "/plugins/"
        }
    ]
    */
}).catch(err => {
    console.log(err);
    /*
    {
        "error": {
            "message": "Not authorized."
        }
    }
    */
});
```

# Service
## Authenticate access for the service
```js
// User authentication code
var auth_code = 'ca221d77-6408-471f-af7f-c370f0bad562';

// Service ID of the requested service
var serviceId = '605cdd28bc733dae5dab1433';

ZenAPI.service(auth_code, serviceId).authenticate().then(data => {
    console.log(data);
    /*
    {
        "message": "Access granted."
    }
    */
}).catch(err => {
    console.log(err);
    /*
    {
        "error": {
            "message": "Not authorized."
        }
    }
    */
});
```

## Get service data
```js
// User authentication code
var auth_code = 'ca221d77-6408-471f-af7f-c370f0bad562';

// Service ID of the requested service
var serviceId = '605cdd28bc733dae5dab1433';

ZenAPI.service(auth_code, serviceId).getData().then(data => {
    console.log(data);
    /*
    {
        "message": "Access granted."
    }
    */
}).catch(err => {
    console.log(err);
    /*
    {
        "error": {
            "message": "Not authorized."
        }
    }
    */
});
```

## Control service
```js
// User authentication code
var auth_code = 'ca221d77-6408-471f-af7f-c370f0bad562';

// Service ID of the requested service
var serviceId = '605cdd28bc733dae5dab1433';

ZenAPI.service(auth_code, serviceId).start().then(data => {
    console.log(data);
    /*
    {
        "message": "Server started."
    }
    */
}).catch(err => {
    console.log(err);
    /*
    {
        "error": {
            "message": "Not authorized."
        }
    }
    */
});

ZenAPI.service(..., ...).stop().then(data => ...).catch(err => ...);
ZenAPI.service(..., ...).kill().then(data => ...).catch(err => ...);
```

## Send command to the service
```js
// User authentication code
var auth_code = 'ca221d77-6408-471f-af7f-c370f0bad562';

// Service ID of the requested service
var serviceId = '605cdd28bc733dae5dab1433';

// Command to send
var command = 'op Notch';

ZenAPI.service(auth_code, serviceId).sendCommand(command).then(data => {
    console.log(data);
    /*
    {
        "message": "Server started."
    }
    */
}).catch(err => {
    console.log(err);
    /*
    {
        "error": {
            "message": "Not authorized."
        }
    }
    */
});
```