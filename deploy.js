import { execSync } from 'child_process';
import readline from 'readline';

const REPO_URL = 'https://github.com/Aatheessubash/DeCodeInfoTech.git';

function runCmd(cmd, returnOutput = true) {
  try {
    const res = execSync(cmd, {
      encoding: 'utf8',
      stdio: returnOutput ? ['pipe', 'pipe', 'pipe'] : 'inherit',
    });
    return returnOutput && res ? res.trim() : true;
  } catch (error) {
    return null;
  }
}

async function main() {
  console.log('\n\x1b[35m========================================================\x1b[0m');
  console.log('\x1b[1m\x1b[36m🚀  DeCode InfoTech — CI/CD Interactive Deployer\x1b[0m');
  console.log(`\x1b[90m📦  Target Repository: ${REPO_URL}\x1b[0m`);
  console.log('\x1b[35m========================================================\x1b[0m\n');

  // Check if inside a git repository
  const isGit = runCmd('git rev-parse --is-inside-work-tree');
  if (!isGit) {
    console.error('\x1b[31m❌ Error: Not a git repository.\x1b[0m');
    process.exit(1);
  }

  // Ensure remote origin points to the target repository
  const currentRemote = runCmd('git remote get-url origin');
  if (!currentRemote) {
    console.log(`\x1b[33m⚡ Setting remote origin to ${REPO_URL}...\x1b[0m`);
    runCmd(`git remote add origin ${REPO_URL}`);
  }

  // Detect current branch
  const activeBranch = runCmd('git rev-parse --abbrev-ref HEAD') || 'main';

  // Readline interface for user input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = (query) => new Promise((resolve) => rl.question(query, resolve));

  try {
    // 1. Ask for the target branch
    console.log(`Current active branch: \x1b[32m${activeBranch}\x1b[0m`);
    const branchInput = await ask(`🌿 Enter branch name to deploy [\x1b[36mdefault: ${activeBranch}\x1b[0m / or press Enter]: `);
    const targetBranch = branchInput.trim() ? branchInput.trim() : activeBranch;

    // Switch branch if user specified a different branch
    if (targetBranch !== activeBranch) {
      console.log(`\n⏳ Switching to branch '\x1b[36m${targetBranch}\x1b[0m'...`);
      const checkoutRes = runCmd(`git checkout ${targetBranch}`, false);
      if (!checkoutRes) {
        console.log(`Creating and switching to new branch '\x1b[36m${targetBranch}\x1b[0m'...`);
        const createBranchRes = runCmd(`git checkout -b ${targetBranch}`, false);
        if (!createBranchRes) {
          console.error(`\x1b[31m❌ Failed to checkout branch '${targetBranch}'\x1b[0m`);
          rl.close();
          process.exit(1);
        }
      }
    }

    // 2. Check for changes
    const statusOutput = runCmd('git status --porcelain');
    const hasChanges = Boolean(statusOutput && statusOutput.length > 0);
    const uncommittedCount = hasChanges ? statusOutput.split('\n').filter(Boolean).length : 0;

    console.log(`\n📊 Status: \x1b[33m${uncommittedCount} uncommitted change(s)\x1b[0m`);

    // 3. Confirm deployment
    const confirmPrompt = await ask(`\n❓ Confirm commit and deploy to branch '\x1b[32m${targetBranch}\x1b[0m'? [\x1b[1mEnter/ok/y\x1b[0m to proceed, \x1b[31mn\x1b[0m to cancel]: `);
    const confirmation = confirmPrompt.trim().toLowerCase();

    // Accept Enter (empty string), 'ok', 'y', 'yes'
    if (confirmation !== '' && !['ok', 'y', 'yes'].includes(confirmation)) {
      console.log('\n\x1b[31m🚫 Deployment cancelled by user.\x1b[0m\n');
      rl.close();
      process.exit(0);
    }

    // 4. Prompt for commit message
    let commitMessage = `Deploy update: ${new Date().toLocaleString()}`;
    if (hasChanges) {
      const customMsg = await ask(`💬 Enter commit message [\x1b[90mdefault: "${commitMessage}"\x1b[0m]: `);
      if (customMsg.trim()) {
        commitMessage = customMsg.trim();
      }
    }

    rl.close();

    // 5. Stage, Commit & Push
    console.log('\n\x1b[36m1️⃣  Staging all changes (git add .)...\x1b[0m');
    execSync('git add .', { stdio: 'inherit' });

    if (hasChanges) {
      console.log(`\x1b[36m2️⃣  Committing: "${commitMessage}"...\x1b[0m`);
      try {
        execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, { stdio: 'inherit' });
      } catch (err) {
        console.log('ℹ️ No new changes needed to commit.');
      }
    } else {
      console.log('ℹ️ Working tree is clean. Proceeding with push...');
    }

    console.log(`\x1b[36m3️⃣  Pushing to origin/${targetBranch} (${REPO_URL})...\x1b[0m`);
    execSync(`git push -u origin ${targetBranch}`, { stdio: 'inherit' });

    console.log('\n\x1b[32m========================================================\x1b[0m');
    console.log(`\x1b[1m\x1b[32m🎉 DEPLOYED SUCCESSFULLY TO BRANCH: ${targetBranch}\x1b[0m`);
    console.log(`\x1b[36m🔗 Repository: ${REPO_URL}\x1b[0m`);
    console.log('\x1b[32m========================================================\x1b[0m\n');

  } catch (error) {
    rl.close();
    console.error('\n\x1b[31m❌ Deployment failed with error:\x1b[0m', error?.message || error);
    process.exit(1);
  }
}

main();
