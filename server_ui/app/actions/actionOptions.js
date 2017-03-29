const exportObj = {
    ioTypes: {},
    ioFlags: {}
};

// io types

exportObj.ioTypes.ROUTE = 'ROUTE';
exportObj.ioTypes.XYZ_MAP = 'XYZ_MAP';
exportObj.ioTypes.UPDATE_PARAMETER = 'UPDATE_PARAMETER';

// io flags

exportObj.ioFlags.ADD = 'ADD';
exportObj.ioFlags.REMOVE = 'REMOVE';
exportObj.ioFlags.SOLO = 'SOLO';
exportObj.ioFlags.BYPASS = 'BYPASS';

module.exports = exportObj;
