const { spawn } = require('child_process');

async function stonkProcess(interaction) {
  const symbol = interaction.options.getString('symbol');
  await interaction.deferReply(); // Defer the reply because the Python script might take a while

  const subprocess = spawn('python3', ['/home/jeremy/Documents/WiggleHQ/Heidi/stock-predict/project.py', symbol]);

  let output = '';

  subprocess.stdout.on('data', (data) => {
    output += data.toString(); // Append the data to the output
  });

  subprocess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  subprocess.on('close', async (code) => {
    console.log(`child process exited with code ${code}`);
    if (code === 0) {
      // If the script exited without errors, send the output as a reply
      const lines = output.split('\n'); // Split the output into lines
      let lastLine = lines[lines.length - 2]; // The last line will be empty because of the trailing newline, so get the second last line
      if (lastLine.length > 200) {
        lastLine = lastLine.substring(0, 1997) + '...'; // Truncate and add '...' if it's too long
      }
      await interaction.editReply(`Analysis for stock ${symbol} completed:\n${lastLine}`);
    } else {
      // If there was an error, let the user know
      await interaction.editReply(`An error occurred while analyzing stock ${symbol}. Please try again later.`);
    }
  });
}

module.exports = stonkProcess;
