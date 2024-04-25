// .mocharc.cjs
module.exports = {
    spec: "TestCase/*.js", // Specify the location of the test file
    timeout: 100000, // Set the default timeout for test cases (milliseconds)
    reporter: 'mochawesome', // Use mochawesome as the test report generator
    'reporter-option': [
    'reportDir=Report', // Report directory
    'reportFilename=[status]_[datetime]-[name]-report', //Report file name
    'html=true', // enable html report
    'json=false', // disable json report
    'overwrite=false', // disable report file overwrite
    'timestamp=longDate', // add timestamp to report file name
    
    ], // mochawesome report generator options
    };