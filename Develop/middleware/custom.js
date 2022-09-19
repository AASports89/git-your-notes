//CUSTOME MIDDLEWARE --> LOGS OUT TYPE & PATH --> EACH REQUEST TO SERVER//
    const custom = (req, res, next) => {
        const fgCyan = '\x1b[36m';
        switch (req.method) {
        case 'GET': {
        console.info(`📗 ${fgCyan}${req.method} request to ${req.path}`);
        break;
        }
        case 'POST': {
        console.info(`📘 ${fgCyan}${req.method} request to ${req.path}`);
        break;
        }
        default:
        console.log(`📙${fgCyan}${req.method} request to ${req.path}`);
        }
  
        next();
    };
  
    exports.custom = custom;