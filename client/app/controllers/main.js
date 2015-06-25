angular.module('edify.main', [])

.controller('MainController', function($scope, Auth, Users, Skills) {

  Auth.getUser()
    .success(function(data, status) {
      $scope.user = data;
    })
    .error(function(data, status) {
      console.log('ERROR:', status);
    });


  // TODO: see #150
  
  // $scope.levels = [
  //   'wat',
  //   'noob',
  //   'dabbling',
  //   'enthusiast',
  //   'aficionado',
  //   'master',
  //   'sorcerer',
  //   'demigod'
  // ];
  //
  // // $scope.displayLevel = '';
  //
  // $scope.levelify = function(numLevel) {
  //   'debugger'
  //   return $scope.levels[numLevel];
  // }

  $scope.updateBio = function() {
    var user = {
      blurb: $scope.user.blurb,
      userId: $scope.user.id
    };

    Users.putUser(user).then(function(data) {
      console.log('saved user blurb!');
    });
  };

  $scope.increaseLearnSkillLevel = function(index) {
    console.log('learn skill level increased!');
    $scope.user.learnSkills[index].skill_level += 1;
  };

  $scope.decreaseLearnSkillLevel = function(index) {
    console.log('learn skill level decreased!');
    $scope.user.learnSkills[index].skill_level -= 1;
  };

// POST request to api/skills -  { type: 'teach', skill: 'javascript', skilllevel: 3, userId: 3 }

  $scope.saveLearnSkill = function(index) {
    var skill = {
      type: 'learn',
      skill: $scope.user.learnSkills[index].skill_name,
      skillLevel: $scope.user.learnSkills[index].skill_level,
      userId: $scope.user.id
    };
    Skills.postSkill(skill).then(function(data) {
      console.log('learn skill level saved!');
    });
  };

  $scope.removeLearnSkill = function(index) {
    var skillId = $scope.user.learnSkills[index].id;
    $scope.user.learnSkills.splice(index, 1);
    Skills.deleteSkill($scope.user.id, skillId, 'learn')
      .then(function(data) {
        console.log(data);
        // console.log('learn skill removed!');
      });
  };

  $scope.increaseTeachSkillLevel = function(index) {
    $scope.user.teachSkills[index].skill_level += 1;
    console.log('teach skill increased!');
  };

  $scope.decreaseTeachSkillLevel = function(index) {
    $scope.user.teachSkills[index].skill_level -= 1;
    console.log('teach skill decreased!');
  };

  $scope.saveTeachSkill = function(index) {
    var skill = {
      type: 'teach',
      skill: $scope.user.teachSkills[index].skill_name,
      skillLevel: $scope.user.teachSkills[index].skill_level,
      userId: $scope.user.id
    };
    Skills.postSkill(skill).then(function(data) {
      console.log('teach skill level saved!');
    });
  };

  $scope.removeTeachSkill = function(index) {
    var skillId = $scope.user.teachSkills[index].id;
    $scope.user.teachSkills.splice(index, 1);
    Skills.deleteSkill($scope.user.id, skillId, 'teach')
      .then(function(data) {
        console.log(data);
        // console.log('teach skill removed!');
      });
  };

});
