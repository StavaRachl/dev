const GITHUB_USERNAME = "StavaRachl";

async function loadGitHubStats() {
    try {
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}`
        );

        if (!response.ok) {
            throw new Error(`GitHub API: ${response.status}`);
        }

        const user = await response.json();

        document.getElementById("github-repos").textContent =
            user.public_repos;

        document.getElementById("github-followers").textContent =
            user.followers;

        await loadRepositoryStats();

    } catch (error) {
        console.error("Failed to load GitHub stats:", error);
    }
}

async function loadRepositoryStats() {
    const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`
    );

    if (!response.ok) {
        throw new Error(`GitHub API: ${response.status}`);
    }

    const repositories = await response.json();

    let stars = 0;
    let forks = 0;

    for (const repository of repositories) {
        stars += repository.stargazers_count;
        forks += repository.forks_count;
    }

    document.getElementById("github-stars").textContent = stars;
    document.getElementById("github-forks").textContent = forks;
}

loadGitHubStats();