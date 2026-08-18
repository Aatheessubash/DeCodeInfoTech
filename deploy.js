import { execSync } from 'child_process';
import readline from 'readline';

function runCmd(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
  } catch {
    return null;
  }
}

async function main() {
  console.log('\n==============================================');
  console.log('🚀  DeCode Interactive Deploy Assistant');
  console.log('==============================================');

  // 1. Get current git branch
  const currentBranch = runCmd('git rev-parse --abbrev-ref HEAD');

  if (!currentBranch) {
    console.error('❌ Error: Not a git repository or unable to detect branch.');
    process.exit(1);
  }

  // 2. Check pending changes
  const statusOutput = runCmd('git status --porcelain');
  const hasChanges = statusOutput && statusOutput.length > 0;
  const changedFilesCount = hasChanges ? statusOutput.split('\n').filter(Boolean).length : 0;

  console.log(`📌 Target Branch : \x1b[36m${currentBranch}\x1b[0m`);
  console.log(`📦 Uncommitted Files: \x1b[33m${changedFilesCount} file(s)\x1b[0m`);
  console.log('==============================================\n');

  // 3. Create CLI readline interface for confirmation
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (query) => new Promise((resolve) => rl.question(query, resolve));

  const answer = await question(`❓ Confirm deployment to branch '\x1b[36m${currentBranch}\x1b[0m'? (y/N): `);

  if (!['y', 'yes'].includes(answer.trim().toLowerCase())) {
    console.log('\n🚫 Deployment cancelled by user.\n');
    rl.close();
    process.exit(0);
  }

  // 4. Prompt for custom commit message if there are changes
  let commitMessage = 'Auto deploy update';
  if (hasChanges) {
    const customMsg = await question('💬 Enter commit message [default: "Auto deploy update"]: ');
    if (customMsg.trim()) {
      commitMessage = customMsg.trim();
    }
  }

  rl.close();

  console.log('\n⏳ Staging changes and committing...');
  execSync('git add .', { stdio: 'inherit' });

  if (hasChanges) {
    try {
      execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });
    } catch {
      console.log('ℹ️ No new changes to commit.');
    }
  }

  console.log(`\n🚀 Pushing to origin/${currentBranch}...`);
  try {
    execSync(`git push origin ${currentBranch}`, { stdio: 'inherit' });
    console.log(`\n✅ SUCCESSFULLY DEPLOYED TO \x1b[32m${currentBranch}\x1b[0m!\n`);
  } catch {
    console.error(`\n❌ Push failed! Please check your network or git credentials.\n`);
    process.exit(1);
  }
}

main();
