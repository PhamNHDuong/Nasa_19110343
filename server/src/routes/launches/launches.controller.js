const { 
    getAllLaunches,
    addNewLaunches,
    existsLaunchWithId,
    abortLaunchById,
} = require('../../models/launches.model')

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
};

function httpAddNewLaunch(req, res) {
    const launch = req.body;

    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: 'Mission required launch property',
        });
    }

    launch.launchDate = new Date(launch.launchDate);
    if(isNan(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date'
        });
    }

    addNewLaunches(launch);
    return res.status(201).json(launch);
}

function httpAportLaunch(req, res) {
    const launchId = req.params.id;

    if(!existsLaunchWithId(launchId)){
        return res.status(404).json({
            error: 'Launch not found',
        });
    }
    
    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted);
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAportLaunch,
};