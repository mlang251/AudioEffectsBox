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
exportObj.ioFlags.REMOVE_EFF = 'REMOVE_EFF';
exportObj.ioFlags.SOLO = 'SOLO';
exportObj.ioFlags.BYPASS = 'BYPASS';
exportObj.ioFlags.REORDER = 'REORDER';
exportObj.ioFlags.REMOVE_MAP = 'REMOVE_MAP';
exportObj.ioFlags.SET_MAP = 'SET_MAP';

module.exports = exportObj;
