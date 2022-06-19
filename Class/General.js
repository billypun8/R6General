const { attackers, defenders } = require('./Operator.json');
var players = require("./Players");
var team;
var oTeam;
var aoTeam;
var doTeam;

function assign(action, filter = null, filterValue = null) {
    // Ensure have player
    let msgPrefix = '';
    let filterMsg = '';

    if (players.players.length == 0) {
        return "No Player!"
    }

    // Choose Team
    if (action == "attack") {
        // Deep copy in first time
        aoTeam = aoTeam ?? attackers.concat();

        // Charge target by action type
        team = attackers;
        oTeam = aoTeam.concat();
    } else {
        // Deep copy in first time
        doTeam = doTeam ?? defenders.concat();

        // Charge target by action type
        team = defenders;
        oTeam = doTeam.concat();
    }

    // Apply Filter
    if (filter) {
        filterMsg = `Filter: ${filter}, Value: ${filterValue}.\n\nReset operator pool to apply filter. . .\n\n`;
        team = oTeam.filter(operator => operator[filter] == filterValue);
    }

    if (team.length == 0) {
        team = oTeam.concat();
        msgPrefix = 'Pool is empty. Reset the operator pool. . .\n\n'
    }

    // Operator left
    let left;
    if (team.length < players.players.length) {
        left = oTeam.filter(x => !team.includes(x))
    }

    if (filter && team.length < players.players.length) {
        for (let index = 0; index < (players.players.length - team.length); index++) {
            let i = getRandomIndex(team.length);
            team.push(left[i])
            left.splice(i, 1);
        }
        filterMsg += "Not enough filtered operator. Use other operators.\n\n";
    }

    // Assign Operators
    let assigned = [];
    players.players.forEach(p => {
        if (team.length == 0) {
            team = oTeam.concat();
            msgPrefix = 'Pool is empty. Reset the operator pool. . .\n\n'
        }
        let i = getRandomIndex(team.length);
        let o = team[i];
        team.splice(i, 1);
        assigned.push(p.username + " : " + o.name + ".\n\n")
    });

    return filterMsg + msgPrefix + assigned.join("");
}

function getRandomIndex(max) {
    return Math.floor(Math.random() * (max - 1));
}

module.exports = assign;