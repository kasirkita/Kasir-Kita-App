const { MSICreator } =  require('electron-wix-msi');

// Step 1: Instantiate the MSICreator
const msiCreator = new MSICreator({
  appDirectory: './dist/windows',
  description: 'Aplikasi POS Untuk UMKM dan UKM',
  exe: 'kasir-kita',
  name: 'Kasir Kita',
  manufacturer: 'Kasir Kita',
  version: '2.0.0',
  outputDirectory: './dist/windows/output'
});

// Step 2: Create a .wxs template file
msiCreator.create();

// Step 3: Compile the template to a .msi file
msiCreator.compile();