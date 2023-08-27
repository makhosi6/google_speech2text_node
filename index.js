const ffmpeg = require('fluent-ffmpeg');
const speech = require('@google-cloud/speech'), fs = require('node:fs')
const client = new speech.SpeechClient();

/**
 * Calls the Speech-to-Text API on a demo audio file.
 */
async function quickstart() {



    // The path to the remote LINEAR16 file stored in Google Cloud Storage
    const filename = __dirname + '/audio.mp3';


    // const command = ffmpeg({
    //     source: filename
    // }).addOption('-ac', 1)
    // .saveToFile('./sample-audio.mp3');


    // const conv = new ffmpeg({ source:filename });
    // conv
    // .setStartTime(59) //Can be in "HH:MM:SS" format also
    // .setDuration(59) 
    // .on("start", function(commandLine) {
    //     console.log("Spawned FFmpeg with command: " + commandLine);
    // })
    // .on("error", function(err) {
    //     console.log("error: ", +err);
    // })
    // .on("end", function(err) {
    //     if (!err) {
    //         console.log("conversion Done");
    //     }
    // })
    // .saveToFile("./trimmed_audio.mp3");

    const file = fs.readFileSync(__dirname + "/trimmed_audio.mp3");
    const audioBytes = file.toString('base64');

    const audio = {
        content: audioBytes
    };

    const config = {
        encoding: 'MP3',
        sampleRateHertz: 44100,
        languageCode: 'en-US',
    };
    const request = {
        audio,
       config,
    };

    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
    console.log(`Transcription: ${transcription}`);
}

quickstart().then(console.log);

