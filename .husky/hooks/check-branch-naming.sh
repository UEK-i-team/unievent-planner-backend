# !/bin/sh

local_branch_name=$(git rev-parse --abbrev-ref HEAD)
valid_branch_regex='^(fix|feature)\/[a-zA-Z0-9\-]+$'
message="There is something wrong with your branch name. Branch names in this project must adhere to this contract: $valid_branch_regex. Example of correct branch name: fix/myBranchName or feature/myBranchName. Your commit will be rejected. You should rename your branch to a valid name and try again."

if echo "$local_branch_name" | grep -Eq "$valid_branch_regex"; then
    echo "Your branch name is valid. Commit is allowed."
    exit 0
else
    echo "$message"
    exit 1
fi
