process.stdout.write('Enter a number: ');

process.stdin.on('data', (data) => {
    const number = parseFloat(data.toString().trim());
    process.stdout.write(`You entered: ${number}\n`);
});