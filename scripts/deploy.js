#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const S3_BUCKET = 'guitar-scales';
const S3_REGION = 'eu-west-2';
const BUILD_DIR = path.join(__dirname, '../build');

console.log('🚀 Starting deployment...');

// Check if build directory exists
if (!fs.existsSync(BUILD_DIR)) {
    console.error('❌ Build directory not found. Run "npm run build" first.');
    process.exit(1);
}

// Check if AWS CLI is available
try {
    execSync('aws --version', { stdio: 'ignore' });
} catch {
    console.error('❌ AWS CLI is not installed or not in PATH.');
    console.error('   Install it from: https://aws.amazon.com/cli/');
    process.exit(1);
}

try {
    console.log('📤 Syncing files to S3...');
    execSync(`aws s3 sync ${BUILD_DIR} s3://${S3_BUCKET} --delete --region ${S3_REGION}`, {
        stdio: 'inherit',
    });
    
    console.log('✅ Deployment complete!');
    console.log(`🌐 Your app is live at: https://${S3_BUCKET}.s3.${S3_REGION}.amazonaws.com/`);
} catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
}
