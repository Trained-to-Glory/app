angular.module('views.glory', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/account/account.html',
    '<ion-view view-title="Profile" class="font-thin" style="background:#fafafc;margin-left: 0 !important" hide-nav-bar="true">\n' +
    '\n' +
    '    <ion-nav-buttons side="right">\n' +
    '          <button class="button button-dark button-clear icon ion-android-more-vertical" style="margin-right: 20px;z-index: 999;" ui-sref="settings"></button>\n' +
    '      </ion-nav-buttons>\n' +
    '\n' +
    '    <ion-content class="has-tabs-top" style="top: 32px !important;">\n' +
    '    <div style="height:100%;" class="bg-lightgrey" on-swipe-right="onSwipeRight()">\n' +
    '      <div class="list card" style="box-shadow: none;margin-left:0;margin-right:0;margin: 0;height: 500px;">\n' +
    '        <div class="item profile item-image bg-image" style="max-height: 490px;margin-top: 17px;background-image: url({{profile.userPhoto}})">\n' +
    '          <div class = "row" style="position: inherit;bottom: 9px;">\n' +
    '          <ion-list>\n' +
    '            <ion-item ng-if= "!profile.fullName" style="border:none;padding-bottom: 5px;background-color: transparent !important;left: 0;font-size: 20px;color:white; font-weight: 700;letter-spacing: 1.2px;">\n' +
    '              {{profile.firstName + " " + profile.lastName }}\n' +
    '            </ion-item>\n' +
    '            <ion-item ng-if= "profile.fullName" style="border:none;background-color: transparent !important;left: 0;font-size: 20px;font-weight: 700;color: white;letter-spacing: 1.2px;">\n' +
    '              {{profile.fullName }}\n' +
    '            </ion-item>\n' +
    '            <ion-item style="left: 0;border:none;text-align: left;font-weight: 500;padding-top: 0px;padding-bottom: 0px;background-color: transparent !important;font-size: 12px;letter-spacing: 1px;color: white">\n' +
    '              {{profile.userName }}\n' +
    '            </ion-item>\n' +
    '          </ion-list>\n' +
    '          <a class="col btn-floating btn-small waves-effect waves-light lighten-1" style="z-index: 5;position: inherit;right: 8px;background-color: white;display: inline-block;color: black;font-size: 24px;width:42px;height:42px;bottom: 5%;line-height: 42px;" ng-click="uploadUserPhoto()">\n' +
    '            <i class="icons ion-ios-camera" style="color: black;display: inherit;font-size: 24px;margin:auto;position: inherit;margin-top: -7%;margin-left: -12%"></i>\n' +
    '          </a>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '      <div class = "button button-clear icon ion-ios-gear profile-settings" ui-sref="settings" style="display: block;position: relative;margin: 0 auto;width: 40%;border-radius: 50px;">Settings</div>\n' +
    '      <div ng-if = "profile.userDescription" style="text-align: center; max-height: 100px;margin-bottom: 5px;margin-left: 30px;margin-right: 30px;line-height: 25px;">{{ profile.userDescription }}</div>\n' +
    '\n' +
    '        <div class="row no-padding bb-grey text-center" style="text-transform: capitalize;" >\n' +
    '            <div class="col font-thin" ng-class="{\'text-medium balanced bb\' : view.type === 1}" ng-click="view.type = 1">{{userTotalPost}}<br/>Posts</div>\n' +
    '            <div class="col font-thin" ng-class="{\'text-medium balanced bb\' : view.type === 2}" ng-click="view.type = 2">{{userTotalCommits}}<br/>Commits</div>\n' +
    '            <div class="col font-thin" ng-class="{\'text-medium balanced bb\' : view.type === 3}"  ng-click="view.type = 3">{{userPartners}}<br/>Friends</div>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="list card profile" style="background: transparent; height:100%; box-shadow: none;height:100%;margin: 0">\n' +
    '        <div ng-if="view.type === 1" style="height:100%;">\n' +
    '          <div ng-if="userTotalPost == 0" class = "noCommits">\n' +
    '          You have not post any pictures yet\n' +
    '          </div>\n' +
    '                <div style="height: 700px">\n' +
    '                    <div class="row row-no-padding category-2-outer" ng-repeat="userPost in userPosts.itemsArr | orderBy: \'created\': true" ng-if="$index % 3 == 0">\n' +
    '                      <div class="col" style="padding: 5px !important">\n' +
    '                        <a ui-sref="post-detail({post:userPosts.itemsArr[$index].key})">\n' +
    '                          <div class="category-2-item-wrapper">\n' +
    '                            <div class="category-2-item-content">\n' +
    '                              <div class = "multi-bg-outer" style="background-image: url({{userPosts.itemsArr[$index].photo}}); background-color: transparent;z-index:5">\n' +
    '                              </div>\n' +
    '                            </div>\n' +
    '                          </div>\n' +
    '                        </a>\n' +
    '                      </div>\n' +
    '                      <div class="col" style="padding: 5px !important ">\n' +
    '                        <a ui-sref="post-detail({post:userPosts.itemsArr[$index+1].key})">\n' +
    '                          <div class="category-2-item-wrapper">\n' +
    '                            <div class="category-2-item-content">\n' +
    '                              <div class = "multi-bg-outer" style="background-image: url({{userPosts.itemsArr[$index+1].photo}}); background-color: transparent;z-index:5">\n' +
    '                              </div>\n' +
    '                            </div>\n' +
    '                          </div>\n' +
    '                        </a>\n' +
    '                      </div>\n' +
    '                      <div class="col" style="padding: 5px !important ">\n' +
    '                        <a ui-sref="post-detail({post:userPosts.itemsArr[$index+2].key})">\n' +
    '                          <div class="category-2-item-wrapper">\n' +
    '                            <div class="category-2-item-content">\n' +
    '                              <div class = "multi-bg-outer" style="background-image: url({{userPosts.itemsArr[$index+2].photo}}); background-color: transparent;z-index:5">\n' +
    '                              </div>\n' +
    '                            </div>\n' +
    '                          </div>\n' +
    '                        </a>\n' +
    '                      </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '          <div ng-if="view.type === 2" style="height:100%;">\n' +
    '            <div ng-if="userTotalCommits == 0" class = "noCommits">\n' +
    '              You have not commited to any events yet.\n' +
    '            </div>\n' +
    '                      <div class="row row-no-padding category-2-outer" ng-repeat="userCommit in userCommits.itemsArr | orderBy: \'created\': true" ng-if="$index % 3 == 0">\n' +
    '                        <div class="col" style="padding: 5px !important">\n' +
    '                          <a ui-sref="post-detail({post:userCommits.itemsArr[$index].key})">\n' +
    '                            <div class="category-2-item-wrapper">\n' +
    '                              <div class="category-2-item-content">\n' +
    '                                <div class = "multi-bg-outer" style="background-image: url({{userCommits.itemsArr[$index].photo}}); background-color: transparent;z-index:5">\n' +
    '                                </div>\n' +
    '                              </div>\n' +
    '                            </div>\n' +
    '                          </a>\n' +
    '                        </div>\n' +
    '                        <div class="col" style="padding: 5px !important ">\n' +
    '                          <a ui-sref="post-detail({post:userCommits.itemsArr[$index+1].key})">\n' +
    '                            <div class="category-2-item-wrapper">\n' +
    '                              <div class="category-2-item-content">\n' +
    '                                <div class = "multi-bg-outer" style="background-image: url({{userCommits.itemsArr[$index+1].photo}}); background-color: transparent;z-index:5">\n' +
    '                                </div>\n' +
    '                              </div>\n' +
    '                            </div>\n' +
    '                          </a>\n' +
    '                        </div>\n' +
    '                        <div class="col" style="padding: 5px !important ">\n' +
    '                          <a ui-sref="post-detail({post:userCommits.itemsArr[$index+2].key})">\n' +
    '                            <div class="category-2-item-wrapper">\n' +
    '                              <div class="category-2-item-content">\n' +
    '                                <div class = "multi-bg-outer" style="background-image: url({{userCommits.itemsArr[$index+2].photo}}); background-color: transparent;z-index:5">\n' +
    '                                </div>\n' +
    '                              </div>\n' +
    '                            </div>\n' +
    '                          </a>\n' +
    '                        </div>\n' +
    '                      </div>\n' +
    '                </div>\n' +
    '\n' +
    '        <div ng-if="view.type === 3" style="background: transparent; box-shadow: none; margin-top: 20px;">\n' +
    '            <div ng-if="userPartners == 0" style="display: block;position: relative;margin: 0 auto;width: 40%;border-radius: 50px;text-align: center;">\n' +
    '              You have no friends yet\n' +
    '            </div>\n' +
    '              <button ng-if="userPartners == 0" ui-sref = "partners({partner:profile.userId, mode: \'Add\'})" class="button button-calm profile"\n' +
    '              style="border-color: #F10707; background-color: #F10707;display: block;position: relative;margin: 0 auto;width: 40%;border-radius: 50px;margin-top: 20px;">Find Friends</button>\n' +
    '              </button>\n' +
    '            <div class="item item-divider">\n' +
    '                FRIENDS\n' +
    '                <span class="item-note" ui-sref = "partners({partner:profile.userId, mode: \'Add\'})">\n' +
    '                    <a class="button button-calm profile" style="border-color: #F10707; background-color: #F10707;">Find More</a>\n' +
    '                </span>\n' +
    '            </div>\n' +
    '            <partners friend="{{value}}" ng-repeat="value in contacts.itemsArr"></partners>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '      <ion-infinite-scroll ng-if="!noMoreItemsAvailable" icon="spiral" on-infinite="loadMore()" distance="10%"></ion-infinite-scroll>\n' +
    '    </ion-content>\n' +
    '</ion-view>\n'
  );


  $templateCache.put('app/account/edit-profile.html',
    '<ion-view hide-nav-bar="true" class="bg-lightgrey" cache-view="false">\n' +
    '\n' +
    '    <ion-header-bar style="background-color: transparent;top: 0 !important;">\n' +
    '        <div class="row text-center">\n' +
    '            <div class="col font-thin text-large dark" ui-sref="settings" style="color:gray;">Cancel</div>\n' +
    '            <div class="col font-thin text-large balanced bl-grey profile" style="color:green;" ng-click="save()">Save</div>\n' +
    '        </div>\n' +
    '    </ion-header-bar>\n' +
    '\n' +
    '    <ion-content class="profile has-header bt-grey">\n' +
    '        <p class="bb text-smaller padding-horizontal uppercase" style="border-bottom: 2px solid;margin-top: 8%;">info</p>\n' +
    '        <div class="edit padding-horizontal">\n' +
    '          <label class="item item-input profile__input" ng-if = "profile.fullName">\n' +
    '              <input type="text" value="{{ profile.fullName }}" name="fullName">\n' +
    '              <span class="input-label">Full name</span>\n' +
    '          </label>\n' +
    '            <label class="item item-input profile__input" ng-if = "!profile.fullName">\n' +
    '                <input type="text" value="{{ profile.firstName }}" name="firstName">\n' +
    '                <span class="input-label">First name</span>\n' +
    '            </label>\n' +
    '            <label class="item item-input profile__input" ng-if = "!profile.fullName">\n' +
    '                <input type="text" value="{{ profile.lastName }}"  name="lastName">\n' +
    '                <span class="input-label">Last name</span>\n' +
    '            </label>\n' +
    '            <label class="item item-input profile__input">\n' +
    '                <input type="text" value="{{ profile.userName }}" name="userName" label="Username" required>\n' +
    '                <span class="input-label">Username</span>\n' +
    '            </label>\n' +
    '            <label class="item item-input profile__input">\n' +
    '                <input type="email" value="{{ profile.email }}" name="email" label="Email" required>\n' +
    '                <span class="input-label">Email</span>\n' +
    '            </label>\n' +
    '        </div>\n' +
    '\n' +
    '\n' +
    '            <p class="bb text-smaller padding-horizontal uppercase" style="border-bottom: 2px solid">password</p>\n' +
    '            <div class="edit padding-horizontal">\n' +
    '                <label class="item item-input profile__input">\n' +
    '                    <input type="password" name="oldPassword">\n' +
    '                    <span class="input-label" ng-model="changePasswordData.oldPassword">old password</span>\n' +
    '                </label>\n' +
    '                <label class="item item-input profile__input">\n' +
    '                    <input type="password" name="newPassword">\n' +
    '                    <span class="input-label" ng-model="changePasswordData.newPassword">new password</span>\n' +
    '                </label>\n' +
    '                <label class="item item-input profile__input">\n' +
    '                    <input type="password" name="confirmNewPassword">\n' +
    '                    <span class="input-label" ng-click="doChangePassword()">confirm new password</span>\n' +
    '                </label>\n' +
    '            </div>\n' +
    '\n' +
    '        <p class="bb text-smaller padding-horizontal uppercase" style="border-bottom: 2px solid">Interests</p>\n' +
    '        <div class="edit padding-horizontal" ng-repeat="interest in contacts" style="display: inline-flex;font-size:14px;">\n' +
    '          <div class="button font-thin" style = "background-color: transparent; color: black; font-size: 14px; z-index: 999; margin-bottom: 5px; margin-top: 10px;border-color: #F10707;min-height: 0; min-width: 0;border-width: 0;line-height:0">\n' +
    '            {{interest.displayName}}\n' +
    '          </div>\n' +
    '        </div>\n' +
    '        <div class="edit padding-horizontal font-thin" style="margin-top: 20px;font-size: 14px;">\n' +
    '          <a href="" ui-sref="interest"><div ng-click="setPrevScope(\'user\')">Edit Interests</div></a>\n' +
    '        </div>\n' +
    '\n' +
    '        <p class="bb text-smaller padding-horizontal uppercase" style="border-bottom: 2px solid">Description</p>\n' +
    '        <div class="edit padding-horizontal">\n' +
    '          <label class="item item-input profile__input">\n' +
    '                <input type="text" value="{{ profile.userDescription }}" name="userDescription">\n' +
    '                <span class="input-label">Description</span>\n' +
    '          </label>\n' +
    '        </div>\n' +
    '\n' +
    '    </ion-content>\n' +
    '</ion-view>\n'
  );


  $templateCache.put('app/account/findPartners.html',
    '<ion-view title="Add Friends" class="font-thin" hide-nav-bar="true">\n' +
    '\n' +
    '  <ion-header-bar align-title="left" class="bar signup-bar-clear bar-header has-tabs-top" style="top: 0 !important;box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.2);">\n' +
    '    <button style="display: block; transition-duration: 0ms;" ng-click="$ionicGoBack()" class="button back-button hide buttons  button-clear header-item">\n' +
    '      <i class="icon ion-ios-arrow-back" style="color: gray"></i>\n' +
    '      <span class="back-text" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);"></span>\n' +
    '    </button>\n' +
    '    <div class="title title-left header-item" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);margin-left: 0;">Add Friends</div>\n' +
    '  </ion-header-bar>\n' +
    '\n' +
    '  <ion-header-bar align-title="right" class="bar signup-bar-clear bar-header has-tabs-top" style="top: 0 !important;margin-right:15px;box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.2);" ui-sref="intro">\n' +
    '    <div class="title title-left header-item" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);margin-right: 15px;" ui-sref="intro">Next</div>\n' +
    '  </ion-header-bar>\n' +
    '\n' +
    '    <ion-content class="has-header">\n' +
    '      <partners friend="{{person}}" ng-repeat="person in people"></partners>\n' +
    '    </ion-content>\n' +
    '</ion-view>\n'
  );


  $templateCache.put('app/account/friend.html',
    '<ion-view title="Profile" class="font-thin" hide-nav-bar="true" cache-view="false">\n' +
    '  <!-- <ion-nav-bar>\n' +
    '    <ion-nav-back-button style="display: block">\n' +
    '    </ion-nav-back-button>\n' +
    '  </ion-nav-bar>\n' +
    '\n' +
    '  <ion-nav-buttons side = "right">\n' +
    '    <button class="button button-small icon " style = "min-width: 100px" ng-class="{\'button ion-ios-plus-outline\': ones.partnered, \'button ion-ios-checkmark-outline\':!ones.partnered }" ng-click="togglePartner(ones.userId)">\n' +
    '    </button>\n' +
    '  </ion-nav-buttons> -->\n' +
    '\n' +
    '   <div class = "tabs tabs-icon-top tabs-striped tabs-color-active-assertive" style="top: 0 !important;height: 65px !important;\n' +
    '    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.2);">\n' +
    '      <a class = "bar-subheader tab-item" style="background: #fafafc !important;border-top: none" icon ="ion-ios-home" ui-sref = "tabs.news">\n' +
    '         <i class = "icon ion-ios-home" style="margin-top: 14px;"></i>\n' +
    '      </a>\n' +
    '\n' +
    '      <a class = "bar-subheader tab-item" style="background: #fafafc !important;border-top: none" icon ="ion-ios-search" ui-sref = "tabs.explore">\n' +
    '         <i class = "icon ion-ios-search" style="margin-top: 14px;"></i>\n' +
    '      </a>\n' +
    '\n' +
    '      <a class = "bar-subheader tab-item" style="background: #fafafc !important;border-top: none" icon ="ion-ttg-icon" ui-sref = "tabs.match">\n' +
    '         <i class = "icon ion-ttg-icon" style="margin-top: 14px;"></i>\n' +
    '      </a>\n' +
    '\n' +
    '      <a class = "bar-subheader tab-item" style="background: #fafafc !important;border-top: none" icon ="ion-ios-star" ui-sref = "tabs.sentPlans">\n' +
    '         <i class = "icon ion-ios-star" style="margin-top: 14px;"></i>\n' +
    '      </a>\n' +
    '      <a class = "bar-subheader tab-item" style="background: #fafafc !important;border-top: none" icon ="ion-android-person" ui-sref = "tabs.account">\n' +
    '         <i class = "icon ion-android-person" style="margin-top: 14px;"></i>\n' +
    '      </a>\n' +
    '   </div>\n' +
    '\n' +
    '    <ion-content class="has-tabs-top" style="top: 32px !important;">\n' +
    '    <div style="height:100%;" class="bg-lightgrey">\n' +
    '      <div class="list card" style="box-shadow: none;margin-left:0;margin-right:0;margin: 0;height: 500px;">\n' +
    '        <div class="item profile item-image bg-image" style="max-height: 490px;background-image: url({{ones.userPhoto}})" fallback-src="img/profile-picture.png">\n' +
    '          <div class = "row" style="position: inherit;bottom: 9px;">\n' +
    '          <ion-list>\n' +
    '            <ion-item ng-if= "!ones.fullName" style="border:none;padding-bottom: 5px;background-color: transparent !important;left: 0;font-size: 20px;color:white; font-weight: 700;letter-spacing: 1.2px;">\n' +
    '              {{ones.firstName + " " + ones.lastName }}\n' +
    '            </ion-item>\n' +
    '            <ion-item ng-if= "ones.fullName" style="border:none;background-color: transparent !important;left: 0;font-size: 20px;font-weight: 700;color: white;letter-spacing: 1.2px;">\n' +
    '              {{ones.fullName }}\n' +
    '            </ion-item>\n' +
    '            <ion-item style="left: 0;border:none;text-align: left;font-weight: 500;padding-top: 0px;padding-bottom: 0px;background-color: transparent !important;font-size: 12px;letter-spacing: 1px;color: white">\n' +
    '              {{ones.userName }}\n' +
    '            </ion-item>\n' +
    '          </ion-list>\n' +
    '          </div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '\n' +
    '      <!-- <div class = "button button-clear icon ion-ios-gear profile-settings" ui-sref="settings" style="width: 100%">Settings</div> -->\n' +
    '      <button class="button button-small icon " ng-class="{\'button-balanced button-outline ion-ios-personadd-outline\': !ones.partnered, \'button-balanced ion-ios-undo-outline\':ones.partnered }" ng-click="togglePartner(profile.userId)" style="display: block;position: relative;margin: 0 auto;width: 40%;border-radius: 50px;margin-bottom: 20px;">\n' +
    '          <span ng-if="!ones.partnered"> Friend</span>\n' +
    '          <span ng-if="ones.partnered"> Friend</span>\n' +
    '      </button>\n' +
    '\n' +
    '      <div ng-if = "ones.userDescription" style="text-align: center; margin-top: 20px;max-height: 100px;margin-bottom: 5px;margin-left: 30px;margin-right: 30px;line-height: 25px;">{{ ones.userDescription }}</div>\n' +
    '\n' +
    '\n' +
    '        <div class="row no-padding bb-grey text-center" style="text-transform: capitalize;">\n' +
    '            <div class="col font-thin" ng-class="{\'text-medium balanced bb\' : view.type === 1}" ng-click="view.type = 1">{{userTotalPost}}<br/>Posts</div>\n' +
    '            <div class="col font-thin" ng-class="{\'text-medium balanced bb\' : view.type === 2}" ng-click="view.type = 2">{{userTotalCommits}}<br/>Commits</div>\n' +
    '            <div class="col font-thin" ng-class="{\'text-medium balanced bb\' : view.type === 3}" ng-click="view.type = 3">{{userPartners}}<br/>Friends</div>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="list card profile" style="background: transparent; height:100%; box-shadow: none;height:100%;">\n' +
    '          <div ng-if="view.type === 1" style="height:100%;">\n' +
    '            <div ng-if="userTotalPost == 0" class = "noCommits">\n' +
    '            This user has no post yet.\n' +
    '            </div>\n' +
    '                  <div style="height: 700px">\n' +
    '                      <div class="row row-no-padding category-2-outer" ng-repeat="userPost in userPosts.itemsArr" ng-if="$index % 3 == 0">\n' +
    '                        <div class="col" style="padding: 5px !important">\n' +
    '                          <a ui-sref="post-detail({post:userPosts.itemsArr[$index].key})">\n' +
    '                            <div class="category-2-item-wrapper">\n' +
    '                              <div class="category-2-item-content">\n' +
    '                                <div class = "multi-bg-outer" style="background-image: url({{userPosts.itemsArr[$index].photo}}); background-color: transparent;z-index:5">\n' +
    '                                </div>\n' +
    '                              </div>\n' +
    '                            </div>\n' +
    '                          </a>\n' +
    '                        </div>\n' +
    '                        <div class="col" style="padding: 5px !important ">\n' +
    '                          <a ui-sref="post-detail({post:userPosts.itemsArr[$index+1].key})">\n' +
    '                            <div class="category-2-item-wrapper">\n' +
    '                              <div class="category-2-item-content">\n' +
    '                                <div class = "multi-bg-outer" style="background-image: url({{userPosts.itemsArr[$index+1].photo}}); background-color: transparent;z-index:5">\n' +
    '                                </div>\n' +
    '                              </div>\n' +
    '                            </div>\n' +
    '                          </a>\n' +
    '                        </div>\n' +
    '                        <div class="col" style="padding: 5px !important ">\n' +
    '                          <a ui-sref="post-detail({post:userPosts.itemsArr[$index+2].key})">\n' +
    '                            <div class="category-2-item-wrapper">\n' +
    '                              <div class="category-2-item-content">\n' +
    '                                <div class = "multi-bg-outer" style="background-image: url({{userPosts.itemsArr[$index+2].photo}}); background-color: transparent;z-index:5">\n' +
    '                                </div>\n' +
    '                              </div>\n' +
    '                            </div>\n' +
    '                          </a>\n' +
    '                        </div>\n' +
    '                      </div>\n' +
    '                  </div>\n' +
    '              </div>\n' +
    '\n' +
    '    <div ng-if="view.type === 2" style="height:100%;">\n' +
    '      <div ng-if="userTotalCommits == 0" class = "noCommits">\n' +
    '      This user has not commited to any events yet.\n' +
    '      </div>\n' +
    '                <div class="row row-no-padding category-2-outer" ng-repeat="userCommit in userCommits.itemsArr" ng-if="$index % 3 == 0">\n' +
    '                  <div class="col" style="padding: 5px !important">\n' +
    '                    <a ui-sref="post-detail({post:userCommits.itemsArr[$index].key})">\n' +
    '                      <div class="category-2-item-wrapper">\n' +
    '                        <div class="category-2-item-content">\n' +
    '                          <div class = "multi-bg-outer" style="background-image: url({{userCommits.itemsArr[$index].photo}}); background-color: transparent;z-index:5">\n' +
    '                          </div>\n' +
    '                        </div>\n' +
    '                      </div>\n' +
    '                    </a>\n' +
    '                  </div>\n' +
    '                  <div class="col" style="padding: 5px !important ">\n' +
    '                    <a ui-sref="post-detail({post:userCommits.itemsArr[$index+1].key})">\n' +
    '                      <div class="category-2-item-wrapper">\n' +
    '                        <div class="category-2-item-content">\n' +
    '                          <div class = "multi-bg-outer" style="background-image: url({{userCommits.itemsArr[$index+1].photo}}); background-color: transparent;z-index:5">\n' +
    '                          </div>\n' +
    '                        </div>\n' +
    '                      </div>\n' +
    '                    </a>\n' +
    '                  </div>\n' +
    '                  <div class="col" style="padding: 5px !important ">\n' +
    '                    <a ui-sref="post-detail({post:userCommits.itemsArr[$index+2].key})">\n' +
    '                      <div class="category-2-item-wrapper">\n' +
    '                        <div class="category-2-item-content">\n' +
    '                          <div class = "multi-bg-outer" style="background-image: url({{userCommits.itemsArr[$index+2].photo}}); background-color: transparent;z-index:5">\n' +
    '                          </div>\n' +
    '                        </div>\n' +
    '                      </div>\n' +
    '                    </a>\n' +
    '                  </div>\n' +
    '                </div>\n' +
    '          </div>\n' +
    '\n' +
    '          <div ng-if="view.type === 3" style="background: transparent; box-shadow: none">\n' +
    '            <div ng-if="userPartners == 0" class = "noCommits">\n' +
    '            This user has no friends yet.\n' +
    '            </div>\n' +
    '              <div class="item item-divider" ng-if="userPartners > 0">>\n' +
    '                FRIENDS\n' +
    '                <span class="item-note" ui-sref = "friendPartners({friendPartner:profile})">\n' +
    '                    <a class="button button-calm profile" style="border-color: #F10707; background-color: #F10707;">More</a>\n' +
    '                </span>\n' +
    '            </div>\n' +
    '            <friends friend="{{value}}" ng-repeat="value in contacts.itemsArr"></friends>\n' +
    '            </div>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '        <ion-infinite-scroll on-infinite="loadMoreContacts() && loadMorePartnerPost() && loadMoreUserCommits() && loadMore()" ng-if="!moreToScroll" distance="1%"></ion-infinite-scroll>\n' +
    '    </ion-content>\n' +
    '</ion-view>\n'
  );


  $templateCache.put('app/account/partners.html',
    '<ion-view title="Find Friends" hide-nav-bar="true" cache-view="false">\n' +
    '\n' +
    '  <ion-header-bar align-title="left" class="bar signup-bar-clear bar-header has-tabs-top" style="top: 0 !important;box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.2);">\n' +
    '    <button style="display: block; transition-duration: 0ms;" ng-click="$ionicGoBack()" class="button back-button hide buttons  button-clear header-item">\n' +
    '      <i class="icon ion-ios-arrow-back" style="color: gray"></i>\n' +
    '      <span class="back-text" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);"></span>\n' +
    '    </button>\n' +
    '    <div class="title title-left header-item" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);margin-left: 0;">Add Friends</div>\n' +
    '    <div class="buttons" class="bar signup-bar-clear bar-header has-tabs-top" ui-sref="intro">\n' +
    '      <button class="button" style="background: transparent;color: gray;min-height: 50px;line-height: 50px;font-size: 20px;">Next</button>\n' +
    '    </div>\n' +
    '  </ion-header-bar>\n' +
    '\n' +
    '    <ion-content class="has-header">\n' +
    '      <!-- <div ng-show="loading == true" style="text-align:center;margin-top:40px;">\n' +
    '        <ion-spinner></ion-spinner>\n' +
    '      </div> -->\n' +
    '    <partners friend="{{person}}" ng-if = "modeType == \'Regular\'" ng-repeat="person in people"></partners>\n' +
    '    <ion-infinite-scroll ng-if="!noMoreItemsAvailable && modeType == \'Regular\'" on-infinite="loadMore()" distance="10%"></ion-infinite-scroll>\n' +
    '\n' +
    '    <partners friend="{{person}}" ng-if ="modeType == \'Add\' && !person.partnered" ng-repeat="person in people"></partners>\n' +
    '    <ion-infinite-scroll ng-if="!noMoreItemsAvailable && modeType == \'Add\'" on-infinite="loadMore()" distance="10%"></ion-infinite-scroll>\n' +
    '    </ion-content>\n' +
    '</ion-view>\n'
  );


  $templateCache.put('app/chat/sentPlans.html',
    '<ion-view view-title="Goals" on-swipe-left="onSwipeLeft()" on-swipe-right="onSwipeRight()" hide-nav-bar="true">\n' +
    '  <ion-nav-buttons side="right">\n' +
    '        <button class="button button-dark button-clear icon ion-android-more-vertical" style="margin-right: 10px;z-index: 999;" ui-sref="settings"></button>\n' +
    '    </ion-nav-buttons>\n' +
    '\n' +
    '    <nav mfb-menu position="br" effect="fountain"\n' +
    '         active-icon="ion-close-round" resting-icon="ion-plus-round"\n' +
    '         toggling-method="click">\n' +
    '      <button mfb-button icon="ion-ios-camera" label="Create Post"  ui-sref="regular"></button>\n' +
    '      <button mfb-button icon="ion-ios-bell" label="Create Event"  ui-sref="event"></button>\n' +
    '      <button mfb-button icon="ion-ios-star" label="Create Goal"  ui-sref="create-plan"></button>\n' +
    '    </nav>\n' +
    '\n' +
    '    <ion-content class="has-tabs-top" on-swipe-left="onSwipeLeft()" on-swipe-right="onSwipeRight()" style="top: 0 !important;">\n' +
    '      <ion-refresher ng-if = "viewLength > 0" on-refresh="doRefresh()" icon="spiral"></ion-refresher>\n' +
    '      <div ng-show="loading == true" style="text-align:center;margin-top:80px;">\n' +
    '        <ion-spinner></ion-spinner>\n' +
    '      </div>\n' +
    '      <div style="margin-top: 14%;margin-bottom: 20px;box-shadow: none;margin-left: 0; margin-right: 0;">\n' +
    '        <div class="list card image" style="box-shadow: none;margin: 0; margin-bottom: 20px;">\n' +
    '              <div class="item item-image">\n' +
    '                  <img src="img/bg-image-2.jpeg" fallback-src = "img/grayBackground.jpg">\n' +
    '                  <div class="item item-avatar" style="padding-left: 0; padding-right: 0;">\n' +
    '                    <ion-list>\n' +
    '                      <ion-item style="text-align:center">\n' +
    '                        Welcome\n' +
    '                      </ion-item>\n' +
    '                      <ion-item>\n' +
    '                        Create Your First Goal\n' +
    '                      </ion-item>\n' +
    '                    </ion-list>\n' +
    '                  </div>\n' +
    '              </div>\n' +
    '          </div>\n' +
    '          <div style="margin-left: 20px;margin-top: 30px;font-size: 16px;margin-bottom: 20px;display: inline-flex;" class = "font-thin" >Checklist</div>\n' +
    '          <div style="margin-left: 20px;margin-top: 30px;font-size: 16px;margin-bottom: 20px;display: inline-flex;position: fixed;right: 20px;color: green;" class = "font-thin"\n' +
    '            ng-if="totalfakeChecked == -3">Complete</div>\n' +
    '            <ion-list style="box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.2) !important;" class="sentPlans-list">\n' +
    '              <ion-item style="border: none;background-color: white !important;" ng-repeat = "item in fakeGoals" ng-class="{\'text-color sentPlans\' : item.isChecked}">\n' +
    '                <ion-checkbox style="color: #F10707;background-color: transparent;border-color: transparent"data-interest-id="{{ item.id }}" ng-model="item.isChecked"\n' +
    '                  ng-change="fakedCheckedOrNot(item, $index, fakeGoals.length)" ng-class="{\'text-color sentPlans\' : item.isChecked}">\n' +
    '                  {{item.words}}\n' +
    '              </ion-checkbox>\n' +
    '              </ion-item>\n' +
    '            </ion-list>\n' +
    '      </div>\n' +
    '\n' +
    '      <div ng-repeat = "plan in view | orderBy: \'created\': true" style="margin-top: 14%;margin-bottom: 20px;box-shadow: none;margin-left: 0; margin-right: 0;">\n' +
    '      <div class="list card image" style="box-shadow: none;margin: 0;" ui-sref="plan-detail({plan:plan.key})">\n' +
    '            <div class="item item-image">\n' +
    '                <img ng-src="{{plan.photo}}"  ng-if= "{{plan.photo}}" fallback-src = "img/grayBackground.jpg">\n' +
    '                <div class="item item-avatar" style="padding-left: 0; padding-right: 0;">\n' +
    '                  <ion-list>\n' +
    '                    <ion-item>\n' +
    '                      {{plan.title}}\n' +
    '                    </ion-item>\n' +
    '                    <ion-item>\n' +
    '                      {{plan.description}}\n' +
    '                    </ion-item>\n' +
    '                  </ion-list>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div style="margin-left: 20px;margin-top: 30px;font-size: 16px;margin-bottom: 20px;display: inline-flex;" class = "font-thin">Checklist</div>\n' +
    '        <!-- <div style="margin-left: 20px;margin-top: 30px;font-size: 16px;margin-bottom: 20px;display: inline-flex;position: fixed;right: 20px;color: green;" class = "font-thin" ng-show = "item.isChecked ==  plan.checklist.length">Complete</div> -->\n' +
    '        <ion-list style="box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.2);" class="sentPlans-list">\n' +
    '          <ion-item style="border: none;background-color: white !important;" ng-repeat = "item in plan.checklist" ng-hide = "!item.displayName" ng-class="{\'text-color sentPlans\' : item.isChecked}">\n' +
    '            <ion-checkbox style="color: #F10707;background-color: transparent;border-color: transparent"data-interest-id="{{ plan.key }}" ng-model="item.isChecked"\n' +
    '              ng-change="checkedOrNot(item, $index, plan.checklist.length, plan.key)" ng-class="{\'text-color sentPlans\' : item.isChecked}">\n' +
    '              {{item.displayName}}\n' +
    '          </ion-checkbox>\n' +
    '          </ion-item>\n' +
    '        </ion-list>\n' +
    '      </div>\n' +
    '      <ion-infinite-scroll ng-if="!noMoreItemsAvailable" icon="spiral" on-infinite="loadMore()" distance="10%"></ion-infinite-scroll>\n' +
    '    </ion-content>\n' +
    '</ion-view>\n'
  );


  $templateCache.put('app/core/sidemenu.html',
    '<ion-tabs class="tabs-icon-top tabs-striped tabs-color-active-assertive">\n' +
    '    <ion-tab style="background: #fafafc !important;top: 0;-webkit-transform: translateZ(0);-webkit-backface-visibility: hidden;transform: translateZ(0);backface-visibility: hidden;" class = "bar-subheader" icon ="ion-ios-home" native-transitions native-transitions-options="{type: \'slide\'}" ui-sref = "tabs.news">\n' +
    '      <ion-nav-view name="Home"></ion-nav-view>\n' +
    '    </ion-tab>\n' +
    '\n' +
    '    <ion-tab style="background: #fafafc !important;top: 0;-webkit-transform: translateZ(0);-webkit-backface-visibility: hidden;transform: translateZ(0);backface-visibility: hidden;" class = "bar-subheader" icon="ion-ios-search" native-transitions native-transitions-options="{type: \'slide\'}"  ui-sref = "tabs.explore">\n' +
    '      <ion-nav-view name="Explore"></ion-nav-view>\n' +
    '    </ion-tab>\n' +
    '\n' +
    '    <ion-tab style="background: #fafafc !important;top: 0;-webkit-transform: translateZ(0);-webkit-backface-visibility: hidden;transform: translateZ(0);backface-visibility: hidden;" class = "bar-subheader" icon="ion-ttg-icon" native-transitions native-transitions-options="{type: \'slide\'}" ui-sref = "tabs.match">\n' +
    '      <ion-nav-view name="Connect"></ion-nav-view>\n' +
    '    </ion-tab>\n' +
    '\n' +
    '    <ion-tab style="background: #fafafc !important;top: 0;-webkit-transform: translateZ(0);-webkit-backface-visibility: hidden;transform: translateZ(0);backface-visibility: hidden;" class = "bar-subheader" icon ="ion-ios-star" native-transitions native-transitions-options="{type: \'slide\'}" ui-sref = "tabs.sentPlans">\n' +
    '      <ion-nav-view name="Goals"></ion-nav-view>\n' +
    '    </ion-tab>\n' +
    '\n' +
    '    <ion-tab style="background: #fafafc !important;top: 0;-webkit-transform: translateZ(0);-webkit-backface-visibility: hidden;transform: translateZ(0);backface-visibility: hidden;" class = "bar-subheader" icon = "ion-android-person" native-transitions native-transitions-options="{type: \'slide\'}" ui-sref = "tabs.account">\n' +
    '      <ion-nav-view name="Profile"></ion-nav-view>\n' +
    '    </ion-tab>\n' +
    '  </ion-tabs>\n'
  );


  $templateCache.put('app/dashboard/contactLeader.html',
    '<ion-view title="Connect" hide-nav-bar="true" cache-view="false">\n' +
    '\n' +
    '  <ion-header-bar align-title="left" class="bar bar-header has-tabs-top" style="top: 0 !important;background: #fafafc !important;">\n' +
    '    <button style="display: block; transition-duration: 0ms;" ng-click="$ionicGoBack()" class="button back-button hide buttons  button-clear header-item">\n' +
    '      <i class="icon ion-ios-arrow-back"></i>\n' +
    '      <span class="back-text" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);"></span>\n' +
    '    </button>\n' +
    '    <div class="title title-left header-item" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);">Connect</div>\n' +
    '  </ion-header-bar>\n' +
    '\n' +
    '    <ion-content class="has-header" style="top: 44px;">\n' +
    '        <div ng-if="faster == true" style="text-align:center;margin-top:40px;">\n' +
    '          <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>\n' +
    '        </div>\n' +
    '        <partners friend="{{person}}" ng-repeat="person in orderByLocation2(people,myLocation)" ui-sref="friend({contact: person.userId})"></partners>\n' +
    '\n' +
    '        <div ng-if = "person == null" style="text-align: center;top: 0;color: black;margin-top: 20px;">There are no people in your area that selected that interest. Here are some people that you share interests with.</div>\n' +
    '        <div ng-if = "person == null">\n' +
    '          <partners friend="{{user}}" ng-if ="user.status == \'leader\'" ng-repeat="user in scrollPeople" ui-sref="friend({contact: user.userId})"></partners>\n' +
    '        </div>\n' +
    '        <ion-infinite-scroll ng-if="!noMoreItemsAvailable" icon="spiral" class="spinner-positive" on-infinite="loadMore()" distance="10%"></ion-infinite-scroll>\n' +
    '    </ion-content>\n' +
    '  </ion-view>\n'
  );


  $templateCache.put('app/dashboard/contacts.html',
    '<ion-view title="Connect" hide-nav-bar="true" cache-view="false">\n' +
    '\n' +
    '  <ion-header-bar align-title="left" class="bar bar-header has-tabs-top" style="top: 0 !important;background: #fafafc !important;">\n' +
    '    <button style="display: block; transition-duration: 0ms;" ng-click="$ionicGoBack()" class="button back-button hide buttons  button-clear header-item">\n' +
    '      <i class="icon ion-ios-arrow-back"></i>\n' +
    '      <span class="back-text" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);"></span>\n' +
    '    </button>\n' +
    '    <div class="title title-left header-item" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);">Connect</div>\n' +
    '  </ion-header-bar>\n' +
    '\n' +
    '    <ion-content class="has-header" style="top: 44px;">\n' +
    '        <div ng-if="waiting == true" style="text-align:center;margin-top:40px;">\n' +
    '          <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>\n' +
    '        </div>\n' +
    '        <partners friend="{{connections}}" ng-repeat="connections in orderByLocation2(users,myLocation)"></partners>\n' +
    '\n' +
    '        <div ng-if = "users == null" style="text-align: center;top: 0;color: black;margin-top: 20px;">There are no people in your area that selected that interest. Here are some people that you share interests with.</div>\n' +
    '      <div ng-if = "users == null">\n' +
    '        <partners friend="{{user}}" ng-if ="user.status == \'person\'" style = "margin-top: 40px;" ng-repeat="user in scrollPeople"></partners>\n' +
    '      </div>\n' +
    '      <ion-infinite-scroll ng-if="!noMoreItemsAvailable" icon="spiral" class="spinner-positive" on-infinite="loadMore()" distance="10%"></ion-infinite-scroll>\n' +
    '    </ion-content>\n' +
    '</ion-view>\n'
  );


  $templateCache.put('app/dashboard/create-plan.html',
    '<ion-view hide-nav-bar="true" class="bg-lightgrey" cache-view = "false">\n' +
    '\n' +
    '  <ion-header-bar style="background-color: #fafafc;height: 48px;top: 0px !important;position: absolute;">\n' +
    '        <div class="row text-center">\n' +
    '            <div class="col font-thin text-large dark" ng-click="$ionicGoBack()" style="color:gray;">Cancel</div>\n' +
    '            <div class="col font-thin text-large balanced bl-grey profile" style="color:green;" ng-if="!post.created" ng-click="createPlan()">Send</div>\n' +
    '            <div class="col font-thin text-large balanced bl-grey profile" style="color:green;" ng-if="post.created" ng-click="updatePlan()">Send</div>\n' +
    '        </div>\n' +
    '    </ion-header-bar>\n' +
    '\n' +
    '  <ion-content class="has-header" style="top: 44px !important;">\n' +
    '    <div class="event-form" style="height: 283px">\n' +
    '      <div class="list edit padding-horizontal padding-vertical" style="padding:0;height: 283px">\n' +
    '        <div style="height: 283px" ng-if = "pictureLook.type === 1">\n' +
    '        <label class="item item-input event__input" style = "height: 283px;margin-bottom: 0;" ng-click="uploadEventPhoto()" ng-if = "pictureLook.type === 1">\n' +
    '          <div class="card image" style="background:transparent !important; box-shadow:none;margin: 0">\n' +
    '                <div class="item item-image" ng-if = "pictureLook.type === 1">\n' +
    '                  <img class="plan_picture" ng-src = "img/goal-photo.jpg" name = "photo" ng-model="photo">\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <a class="btn-floating btn-small waves-effect waves-light lighten-1" ng-if = "pictureLook.type === 1" style="top: -113px;z-index: 5;left: 5px;background-color: white;width:42px;height:42px;line-height: 42px;" ng-click="uploadEventPhoto()">\n' +
    '              <i class="icon ion-ios-camera" style="color: black;display: inherit;font-size: 24px;margin:auto;position: inherit;margin-top: 3%;margin-left: -1%"></i>\n' +
    '            </a>\n' +
    '        </label>\n' +
    '      </div>\n' +
    '\n' +
    '        <div class="list card" style="box-shadow: none;margin-left:0;margin-right:0;margin-top: 0;margin: 0;padding: 0;" ng-click="uploadEventPhoto()" ng-if="pictureLook.type === 2">\n' +
    '          <div class="item item-image" style="max-height: 500px;box-shadow: none;margin-left:0;margin-right:0;padding: 0;margin: 0;" ng-click="uploadEventPhoto()">\n' +
    '              <img ng-src="{{photo}}" name = "photo" ng-model="photo">\n' +
    '            </div>\n' +
    '        </div>\n' +
    '\n' +
    '          <label class="item item-input event__input" style="margin-bottom:15px;font-weight: 300;padding-top: 20px;border-bottom: none;margin-left: 5px;">\n' +
    '            <input type="text" placeholder="" name="title" style="margin-left:5px;font-weight:300" >{{post.title}}\n' +
    '            <span class="input-label" style="margin-left:5px">Title</span>\n' +
    '          </label>\n' +
    '\n' +
    '          <label class="item item-input event__input" style="margin-bottom: 0">\n' +
    '            <input type="text" placeholder="" name="description" style="margin-left:5px;font-weight:300">{{post.description}}\n' +
    '            <span class="input-label" style="margin-left:5px">Description</span>\n' +
    '          </label>\n' +
    '\n' +
    '          <div style="display:inline-flex">\n' +
    '            <div class = "create-checklist" style="font-weight: 300;margin-left:5px;margin-top: 20px;color: black;" ng-click="view.type = 1">Create Checklist</div>\n' +
    '            <div style="font-weight: 300;position: absolute;right: 5px;color: black;" ng-click="view.type = 2" ng-if = "view.type == 1">Clear Checklist</div>\n' +
    '          </div>\n' +
    '\n' +
    '          <check-list arr="data.checklistArr" ng-if = "view.type === 1"></check-list>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '  </ion-content>\n' +
    '\n' +
    '</ion-view>\n'
  );


  $templateCache.put('app/dashboard/lead.html',
    '<ion-view title="Match" cache-view="false">\n' +
    '  <ion-nav-bar>\n' +
    '    <ion-nav-back-button style="display: block">\n' +
    '    </ion-nav-back-button>\n' +
    '  </ion-nav-bar>\n' +
    '\n' +
    '    <ion-content class="has-header" scroll="true">\n' +
    '\n' +
    '        <ion-scroll class="bg-lightgrey" direction="y" style="height:100%">\n' +
    '          <div style="height:700px">\n' +
    '            <div class="row" ng-repeat=" user in orderByLocation1(users,myLocation)">\n' +
    '              <div class="col">\n' +
    '                  <div class="card contact animated bounceIn item-remove-animate">\n' +
    '                      <div class="item item-image item-text-wrap" ui-sref="friend({contact: user.userId})">\n' +
    '                          <div><img ng-src = "{{ user.userPhoto }}"></div>\n' +
    '                          <h2 class="lead text-small mt">{{user.firstName + " " + user.lastName}}</h2>\n' +
    '                          <p class="">{{user.userName}}</p>\n' +
    '                      </div>\n' +
    '                  </div>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </div>\n' +
    '        </ion-scroll>\n' +
    '    </ion-content>\n' +
    '\n' +
    '</ion-view>\n'
  );


  $templateCache.put('app/dashboard/remind-at-modal.html',
    '<ion-modal-view class="ion-modal">\n' +
    '<div class="row">\n' +
    '        <div class="col"></div>\n' +
    '        <div class="col-75 text-center">\n' +
    '            <h1 class=" balanced font-thin text-larger">Reminder At</h1></div>\n' +
    '        <div class="col text-right ">\n' +
    '            <span class="icon ion-android-close" ng-click="closeRemindAt()"></span>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <ion-content class="has-header">\n' +
    '        <ion-list>\n' +
    '            <ion-checkbox ng-repeat="item in notifyTimes track by $index"\n' +
    '             ng-checked="reminder.remindTime[$index] === item" ng-model="isChecked"  ng-change="checkedOrNot(item, isChecked, $index)" ng-init=\'isChecked=false\'><span style="text-transform: capitalise;">{{item}}</span></ion-checkbox>\n' +
    '        </ion-list>\n' +
    '    </ion-content>\n' +
    '\n' +
    '</ion-modal-view>\n'
  );


  $templateCache.put('app/directives/directive.checklist.html',
    '<div class="item item-input event__input" ng-repeat="checkList in arr track by $index" style="margin-top:15px;margin-bottom:15px">\n' +
    '  <input type="text" name=" notes-{{$index +1}}" style="margin-left:5px;font-weight:300" ng-model="checkList.displayName">{{post.notes}}\n' +
    '  <span class="input-label notes-label-{{$index +1}}" style="margin-left:5px;display: inline-flex">Checklist Item {{$index +1}}</span>\n' +
    '  <div style="font-weight: 300;margin-left: 5px;display: inline-flex;position: absolute;right: 5px;" ng-click="remove($index)">Remove</div>\n' +
    '</div>\n' +
    '\n' +
    '<div class = "create-more" style="font-weight: 300;margin-left: 5px;margin-bottom: 20vh;" ng-click="add()">Create More</div>\n'
  );


  $templateCache.put('app/directives/directive.friends.html',
    '<div class="item item-avatar item-button-right followers" style = "border: none">\n' +
    '  <img ng-src="{{value.userPhoto}}" fallback-src="img/profile-picture.png" ui-sref="friend({contact:value.userId})" >\n' +
    '  <h2 class = "lead" style="font-weight: 400 !important;" ui-sref="friend({contact:value.userId})" >{{value.userName}}</h2>\n' +
    '  <button class="button button-small icon " ng-class="{\'button-balanced button-outline ion-ios-personadd-outline\': !value.partnered, \'button-balanced ion-ios-undo-outline\':value.partnered }">\n' +
    '      <span ng-if="!value.partnered"> Friend</span>\n' +
    '      <span ng-if="value.partnered"> Friend</span>\n' +
    '  </button>\n' +
    '</div>\n'
  );


  $templateCache.put('app/directives/directive.partners.html',
    '<div class="item item-avatar item-button-right followers" style = "border: none">\n' +
    '  <img ng-src="{{value.userPhoto}}" fallback-src="img/profile-picture.png" ui-sref="friend({contact:value.userId})" >\n' +
    '  <h2 class = "lead" style="font-weight: 400 !important;" ui-sref="friend({contact:value.userId})" >{{value.userName}}</h2>\n' +
    '  <button class="button button-small icon " ng-class="{\'button-balanced button-outline ion-ios-personadd-outline\': !value.partnered, \'button-balanced ion-ios-undo-outline\':value.partnered }"\n' +
    '    ng-click="togglePartner(value.userId)">\n' +
    '      <span ng-if="!value.partnered"> Friend</span>\n' +
    '      <span ng-if="value.partnered"> Friend</span>\n' +
    '  </button>\n' +
    '</div>\n'
  );


  $templateCache.put('app/intro/authentication.html',
    '<!-- File style login.scss\n' +
    '(*) assigned classes -->\n' +
    '\n' +
    '<!-- * view-login / container general -->\n' +
    '<ion-view class="view-login" style="color: white;" hide-nav-bar="true">\n' +
    '  <ion-nav-bar>\n' +
    '    <ion-nav-back-button style="display: block">\n' +
    '    </ion-nav-back-button>\n' +
    '  </ion-nav-bar>\n' +
    '\n' +
    '  <ion-header-bar align-title="left" class="bar bar-header has-tabs-top" style="top: 0 !important;background: transparent !important;">\n' +
    '    <button style="display: block; transition-duration: 0ms;" ng-click="$ionicGoBack()" class="button back-button hide buttons  button-clear header-item">\n' +
    '      <i class="icon ion-ios-arrow-back" style="color: gray;"></i>\n' +
    '      <span class="back-text" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);"></span>\n' +
    '    </button>\n' +
    '    <div class="title title-left header-item" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);">Create Account</div>\n' +
    '  </ion-header-bar>\n' +
    '    <!-- * bg-image / background image -->\n' +
    '    <!-- class bg-image is in the file general.scss -->\n' +
    '    <div class="bg-image" style="background-image:url(\'img/thinking-2.jpg\')">\n' +
    '        <!-- * bg-color / background-color -->\n' +
    '        <div class="bg-color login-flow">\n' +
    '            <ion-content style="background: transparent !important;margin-top: 40px" class="auth profile has-header bt-grey">\n' +
    '                <!-- * logo / logo company -->\n' +
    '                <form name="registerForm" novalidate ng-submit="registerForm.$valid && register(user)" style="position: relative;">\n' +
    '                    <div class="list list-inset" style="background-color:transparent !important;">\n' +
    '                      <div class = "row" style="width: 100%;border-bottom: 1px solid white;margin:auto;margin-bottom: 25px;">\n' +
    '                        <label class="item item-input" style="border: none;background-color:transparent !important;margin-top:2px; text-align:center;width:100%;">\n' +
    '                          <input class = "signin" style="color: white" type="text" placeholder="Name" ng-model="user.fullName" validate>\n' +
    '                        </label>\n' +
    '                      </div>\n' +
    '\n' +
    '                      <div class = "row" style="width: 100%;border-bottom: 1px solid white;margin:auto;margin-bottom: 25px;">\n' +
    '                        <label class="item item-input" style="border: none;background-color:transparent !important; margin-top:2px; text-align:center;width:100%;">\n' +
    '                          <input class = "validate signin" style="color: white" type="email" ng-model="user.email"  placeholder="Email" ng-minlength="5" ng-maxlength="30" required>\n' +
    '                        </label>\n' +
    '                      </div>\n' +
    '\n' +
    '                      <div class = "row" style="width: 100%;border-bottom: 1px solid white;margin:auto;margin-bottom: 25px;">\n' +
    '                        <label class="item item-input" style="border: none;background-color:transparent !important; margin-top:2px; text-align:center;width:100%;">\n' +
    '                          <input class = "signin" style="color: white" type="text" placeholder="Username" ng-model="user.userName" validate>\n' +
    '                        </label>\n' +
    '                      </div>\n' +
    '\n' +
    '                      <div class = "row" style="width: 100%;border-bottom: 1px solid white;margin:auto;">\n' +
    '                        <label class="item item-input" style="border: none;background-color:transparent !important; margin-top:2px; text-align:center;width:100%;">\n' +
    '                          <input class = "validate signin" style="color: white" ng-model="user.password" type="password" placeholder="Password" ng-minlength="5" ng-maxlength="30" required>\n' +
    '                        </label>\n' +
    '                      </div>\n' +
    '\n' +
    '                      <h1 class="font-thin" style="color: white; font-size: 14px; font-weight: 400 !important;margin-left: 20px;margin-top: 24px">Would you like to be considered a leader?</h1>\n' +
    '                       <ion-radio ng-model="user.leader" ng-value="\'leader\'" style="background-color: transparent !important;margin-left: 5px;font-weight: 400;border: none">Yes</ion-radio>\n' +
    '                       <ion-radio ng-model="user.person" ng-value="\'person\'" style="background-color: transparent !important;margin-left: 6px;font-weight: 400;border: none">No</ion-radio>\n' +
    '\n' +
    '                        <input class="button button-block button-calm" ng-if="user.person" type="submit" value="SIGN UP" ng-disabled="loginForm.$invalid" style="border-radius: 0px;background-color: white;color: black"></input>\n' +
    '                        <input class="button button-block button-calm" ng-if="!user.person" type="submit" value="SIGN UP" ng-disabled="loginForm.$invalid" style="border-radius: 0px;background-color: white;color: black"></input>\n' +
    '                        <div ng-if="!user.person || user.person" style="font-weight:400;font-size:12px;color: white;text-align:center;">By clicking sign up you are indicating have read the Privacy Policy and agree to the Terms of Use found at www.trainedtoglory.com.</div>\n' +
    '                    </div>\n' +
    '                </form>\n' +
    '            </ion-content>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</ion-view>\n' +
    '\n' +
    '<!--\n' +
    '    <ion-content cache-view="false" class="auth">\n' +
    '      <form name="registerForm" novalidate ng-submit="registerForm.$valid && register(user)">\n' +
    '        <div class="row row-no-padding category-2-outer" style="padding: 0; margin: 0;">\n' +
    '        <div class="col">\n' +
    '            <div class="category-2-item-wrapper">\n' +
    '              <div class="category-2-item-content">\n' +
    '                <div class = "multi-bg-outer" helper-class="category-with-image" style="background-image: url(img/juggler.jpg);">\n' +
    '                  <div class="logo">\n' +
    '                    <img ng-src = "img/TTG-Logo-NowhiteOutline.png">\n' +
    '                  </div>\n' +
    '                </div>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '      <div class="row text-center" style="color: white;top: 230px;position: absolute;">\n' +
    '        <div class="col" style="z-index: 999;position: relative;display: block;">Sign Up</div>\n' +
    '        <div class="col" style="z-index: 999;position: relative;display: block;" ui-sref="signin">Sign In</div>\n' +
    '      </div>\n' +
    '\n' +
    '      <div class="item no-padding" style="background-color: transparent;border-color: transparent;">\n' +
    '\n' +
    '      <div class="row" style="width: 50%;border-bottom: 1px solid silver; margin:auto;">\n' +
    '        <label class="item item-input" style="border: none; margin-top:2px; text-align:center;width:100%;">\n' +
    '          <input type="text" style="text-align:center" placeholder="First Name" ng-model="user.firstName" validate>\n' +
    '        </label>\n' +
    '      </div>\n' +
    '\n' +
    '      <div class = "row" style="width: 50%;border-bottom: 1px solid silver;margin:auto;">\n' +
    '        <label class="item item-input" style="border: none; margin-top:2px; text-align:center;width:100%;">\n' +
    '          <input type="text" style="text-align:center" placeholder="Last Name" ng-model="user.lastName" validate>\n' +
    '        </label>\n' +
    '      </div>\n' +
    '\n' +
    '       <div class="row" style="width: 80%;border-bottom: 1px solid silver;margin:auto;">\n' +
    '         <label class="item item-input" style="border: none; margin-top:2px; text-align:center;width:100%;">\n' +
    '           <input type="text" style="text-align:center;" placeholder="User Name" ng-model="user.userName" validate>\n' +
    '         </label>\n' +
    '      </div>\n' +
    '      <div class="row" style="width: 90%;border-bottom: 1px solid silver;margin:auto;">\n' +
    '        <label class="item item-input" style="border: none; margin-top:2px; text-align:center;width:100%;">\n' +
    '          <input type="email" style="text-align:center;" placeholder="Email" ng-model="user.email" class="validate" ng-minlength="5" ng-maxlength="30" required>\n' +
    '        </label>\n' +
    '      </div>\n' +
    '      <div class="row" style="width: 50%;border-bottom: 1px solid silver;margin:auto;">\n' +
    '        <label class="item item-input" style="border: none; margin-top:2px; text-align:center;width:100%;">\n' +
    '          <input type="password" style="text-align:center" placeholder="Password" ng-model="user.password" class="validate" ng-minlength="5" ng-maxlength="30" required>\n' +
    '        </label>\n' +
    '      </div>\n' +
    '\n' +
    '      <ion-label style="margin-left:60px;margin-top:6px;">Would you like to be considered a leader?</ion-label>\n' +
    '      <ion-radio ng-model="user.leader" ng-value="\'leader\'" style="width:30%;border-color: #fafafc;margin-left:166px;">Yes</ion-radio>\n' +
    '      <ion-radio ng-model="user.person" ng-value="\'person\'" style="width:30%;border-color: #fafafc;margin-left:166px;">No</ion-radio>\n' +
    '\n' +
    '      <input type="submit" ng-if="user.leader"class="button button-block button-login button-positive" value="Sign Up" ng-disabled="registerForm.$invalid" style="border-radius: 50px;width: 50%;position: relative;margin-left: 103px;margin-top: 4vh; display:block;">\n' +
    '      <input type="submit"  ng-if="!user.leader" class="button button-block button-login button-positive" value="Sign Up" ng-disabled="registerForm.$invalid" style="border-radius: 50px;width: 50%;position: relative;margin-left: 103px;;margin-top: 4vh; display:block;">\n' +
    '      <p ng-if="user.leader || !user.leader" style="text-overflow: initial;white-space: initial;margin-bottom:20px;color: black !important;text-align: center;">By clicking sign up you are indicating that you have read the privacy policy and agree to the Terms of Use found on trainedtoglory.com.</p>\n' +
    '    </div>\n' +
    '  </form>\n' +
    '    </ion-content> -->\n'
  );


  $templateCache.put('app/intro/forgot.html',
    '<ion-modal-view hide-nav-bar="true"  class="forgot">\n' +
    '\n' +
    '\n' +
    '    <ion-content scroll="true">\n' +
    '    <form name="forgotPasswordForm" novalidate ng-submit="forgotPasswordForm.$valid && resetPassword(user)">\n' +
    '        <div ng-form="login_form" class="padding text-center" novalidate>\n' +
    '            <ion-list>\n' +
    '                <label class="item item-input">\n' +
    '                    <i class="icon ion-android-person placeholder-icon"></i>\n' +
    '                    <input type="email" placeholder="Email" style = "font-weight: 300" ng-model="user.email" ng-minlength="5" ng-maxlength="30" required>\n' +
    '                </label>\n' +
    '            </ion-list>\n' +
    '            <input type="submit" style="border-radius: 0px;background-color: white;color: black;opacity: 1;" class="button button-block button-calm" value="RESET PASSWORD" ng-disabled="forgotPasswordForm.$invalid">\n' +
    '             <p class="">An email will be sent to you with steps to reset your password</p>\n' +
    '        </div>\n' +
    '        <p class="padding-horizontal" style="text-align: center;margin-top: 3px;">\n' +
    '            <span class="dark pull-right" style = "display: inline-flex;font-size: 16px" ng-click="closeForgot()">Close</span>\n' +
    '        </p>\n' +
    '        </form>\n' +
    '\n' +
    '    </ion-content>\n' +
    '</ion-modal-view>\n'
  );


  $templateCache.put('app/intro/intro.html',
    '<ion-view hide-nav-bar = "true">\n' +
    '        <ion-slide-box on-slide-changed="slideChanged(index)" style="background-color: #fafafc; height: 100%">\n' +
    '          <ion-slide style="background-color: #fafafc">\n' +
    '            <div class="list card" style="box-shadow: none;margin-left:0;margin-right:0; margin: 0;">\n' +
    '              <div class="item item-image" style="max-height: 500px;">\n' +
    '                  <img ng-src="img/commit-party.jpg">\n' +
    '                </div>\n' +
    '              <div class="item item-avatar" style="border: none">\n' +
    '                <img ng-src="img/bg-m.jpg" style="background-color: transparent">\n' +
    '                <h2 class = "lead" style="font-weight: 400 !important;">Jaylen</h2>\n' +
    '                <p style="color:black !important" class="font-thin">Commit to my dinner party</p>\n' +
    '                <p style="color:black !important" class="font-thin">Event</p>\n' +
    '                <p style="color:black !important" class="font-thin">Just Now</p>\n' +
    '              </div>\n' +
    '              <a class="item" style = "display: inline-flex;border: none">\n' +
    '                100 Commit\n' +
    '              </a>\n' +
    '              <a class="item" style = "display: inline-flex;border: none">\n' +
    '                20 Likes\n' +
    '              </a>\n' +
    '              <a class="item" style = "display: inline-flex; border: none;">\n' +
    '                5 Comment\n' +
    '              </a>\n' +
    '            </div>\n' +
    '            <h3 class="font-thin" style="margin-left: 20px;font-size:18px">Commit</h3>\n' +
    '          <p class = "font-thin" style="margin-left: 20px">\n' +
    '            Commit to event post and explore your community.\n' +
    '          </p>\n' +
    '            <div class="button font-thin" style="font-size:16px;display: inline-flex;bottom: 0;right: 0;margin-bottom: 15px;margin-left: 20px;z-index: 999;padding-left: 0;" ng-click="goToLogin()">Skip</div>\n' +
    '          </ion-slide>\n' +
    '          <ion-slide>\n' +
    '            <div class="list card image" style="box-shadow: none;margin-left: 0; margin-right: 0;margin-top: 0;">\n' +
    '                  <div class="item item-image">\n' +
    '                      <img ng-src="img/paint-house.jpeg" style="filter: brightness(100%) grayscale(0%);-webkit-filter: brightness(100%) grayscale(0%);">\n' +
    '                      <div class="item item-avatar" style="padding-left: 0; padding-right: 0;">\n' +
    '                        <ion-list>\n' +
    '                          <ion-item>\n' +
    '                            Paint the House\n' +
    '                          </ion-item>\n' +
    '                          <ion-item>\n' +
    '                            Start with the kitchen on friday.\n' +
    '                          </ion-item>\n' +
    '                        </ion-list>\n' +
    '                      </div>\n' +
    '                  </div>\n' +
    '              </div>\n' +
    '\n' +
    '              <h3 class="font-thin" style="margin-left: 20px;font-size:18px">Create Goals</h3>\n' +
    '              <p class = "font-thin" style="margin-left: 20px">\n' +
    '                Create and stay on track with your goals.\n' +
    '              </p>\n' +
    '            <div class="button font-thin" style="font-size:16px;display: inline-flex;bottom: 0;right: 0;margin-bottom: 15px;margin-left: 20px;z-index: 999;padding-left: 0;" ng-click="goToLogin()">Skip</div>\n' +
    '          </ion-slide>\n' +
    '          <ion-slide on-swipe-left="goToLogin()">\n' +
    '            <div class="row row-no-padding category-2-outer" style="padding:0;overflow:scroll;" onSwipeRight="goToLogin()">\n' +
    '              <div class="col">\n' +
    '                  <div class="category-2-item-wrapper">\n' +
    '                    <div class="category-2-item-content">\n' +
    '                      <div class = "multi-bg-outer" multi-bg="[bg_img]" interval="3000" helper-class="category-with-image" style="background-image: url(img/fashion-train.jpg);">\n' +
    '                        <img bg="" class="multi-bg category-with-image" ng-src="img/fashion-train.jpg">\n' +
    '                        <span class="bg-overlay"></span>\n' +
    '                        <h1 class="category-heading" style="width: 80%">\n' +
    '                          <span>1\n' +
    '                            <span class="bubble"></span>\n' +
    '                          </span>\n' +
    '                          <span style="border-bottom: 1px solid #F10707;">Fashion</span>\n' +
    '                        </h1>\n' +
    '                      </div>\n' +
    '                    </div>\n' +
    '                  </div>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '            <div class="row row-no-padding category-2-outer" style="padding:0;overflow:scroll;" onSwipeRight="goToLogin()">\n' +
    '              <div class="col">\n' +
    '                  <div class="category-2-item-wrapper">\n' +
    '                    <div class="category-2-item-content">\n' +
    '                      <div class = "multi-bg-outer" multi-bg="[bg_img]" interval="3000" helper-class="category-with-image" style="background-image: url(img/food-train.jpeg);">\n' +
    '                        <img bg="" class="multi-bg category-with-image" ng-src="img/food-train.jpeg">\n' +
    '                        <span class="bg-overlay"></span>\n' +
    '                        <h1 class="category-heading" style="width: 80%">\n' +
    '                          <span>2\n' +
    '                            <span class="bubble"></span>\n' +
    '                          </span>\n' +
    '                          <span style="border-bottom: 1px solid #F10707;">Food & Drink</span>\n' +
    '                        </h1>\n' +
    '                      </div>\n' +
    '                    </div>\n' +
    '                  </div>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '            <h3 class="font-thin" style="margin-left: 20px;font-size:18px" on-swipe-left="goToLogin()">Connect</h3>\n' +
    '            <p class="font-thin" style="margin-left: 20px;" on-swipe-left="goToLogin()">\n' +
    '              Connect with people to help expand on your interest.\n' +
    '            </p>\n' +
    '            <div class="button font-thin" style="font-size:16px;display: inline-flex;bottom: 0;right: 0;margin-bottom: 15px;margin-left: 20px;z-index:999;padding-left: 0;" ng-click="goToLogin()">Skip</div>\n' +
    '          </ion-slide>\n' +
    '        </ion-slide-box>\n' +
    '      </ion-view>\n'
  );


  $templateCache.put('app/intro/login.html',
    '\n' +
    '    <ion-content cache-view="false" scroll="true" class="auth" hide-nav-bar="true">\n' +
    '      <div class="bg-image" style="background-image:url(\'img/bg.jpg\');">\n' +
    '        <!-- * bg-color / background-color -->\n' +
    '        <div class="bg-color">\n' +
    '            <ion-content>\n' +
    '                <!-- * logo / logo company -->\n' +
    '                <div class="logo" >\n' +
    '                    <img src="img/logo.png" alt="logo" style="height: 160px;">\n' +
    '                </div>\n' +
    '                <form ng-submit="doLogin()">\n' +
    '                    <div class="list list-inset">\n' +
    '                      <div class = "row" style="width: 100%;border-bottom: 1px solid silver;margin:auto;margin-bottom: 16px;">\n' +
    '                        <label class="item item-input" style="border: none; margin-top:2px; text-align:center;width:100%;">\n' +
    '                          <input type="text" style="text-align:center;margin-left: 20px;" placeholder="Username" validate>\n' +
    '                        </label>\n' +
    '                      </div>\n' +
    '\n' +
    '                      <div class = "row" style="width: 100%;border-bottom: 1px solid silver;margin:auto;">\n' +
    '                        <label class="item item-input" style="border: none; margin-top:2px; text-align:center;width:100%;">\n' +
    '                          <input type="text" style="text-align:center;margin-left: 20px;" placeholder="Password" validate>\n' +
    '                        </label>\n' +
    '                      </div>\n' +
    '                      <p style="position: relative;margin-top: 11px;margin-left: 220px;">\n' +
    '                          Forgot Password\n' +
    '                      </p>\n' +
    '                        <button class="button button-block button-calm" type="submit" style="border-radius: 0px;margin-top: 115px;background-color: rgba(12, 96, 238, 0.45);"  ui-sref="app.feeds">SIGN IN</button>\n' +
    '                        <!-- * line / line separation -->\n' +
    '                        <p style="position: relative;margin-top: 4px;" ui-sref="register">\n' +
    '                            SIGN UP\n' +
    '                        </p>\n' +
    '                    </div>\n' +
    '                </form>\n' +
    '            </ion-content>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '      <!-- <div class="row row-no-padding category-2-outer" style="padding: 0; margin: 0;">\n' +
    '        <div class="col">\n' +
    '            <div class="category-2-item-wrapper">\n' +
    '              <div class="category-2-item-content">\n' +
    '                <div class="row text-center" style="color: white;bottom: 0;position: absolute;">\n' +
    '                  <div class="col font-thin" ng-click="login.type = \'signUp\'">Sign Up</div>\n' +
    '                  <div class="col font-thin" ng-click="login.type = \'signIn\'" ng-click="signIn()">Sign In</div>\n' +
    '                </div>\n' +
    '                <div class = "multi-bg-outer" helper-class="category-with-image" style="background-image: url(img/juggler.jpg);">\n' +
    '                  <div class="logo">\n' +
    '                    <img ng-src = "img/TTG-Symbol-2015-02.png">\n' +
    '                  </div>\n' +
    '                </div>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '      </div> -->\n' +
    '\n' +
    '      <!-- <div class="item no-padding" style="background-color: transparent;border-color: transparent;">\n' +
    '      <div class="row" style="width: 70%;border-bottom: 1px solid silver;margin:auto;">\n' +
    '        <label class="item item-input" style="border: none; margin-top:2px; text-align:center">\n' +
    '          <input type="email" style="text-align:center;margin-left:5vh;" placeholder="Email" ng-model="user.email" class="validate" ng-minlength="5" ng-maxlength="30" required>\n' +
    '        </label>\n' +
    '      </div>\n' +
    '      <div class="row" style="width: 50%;border-bottom: 1px solid silver;margin:auto;">\n' +
    '        <label class="item item-input" style="border: none; margin-top:2px; text-align:center">\n' +
    '          <input type="password" style="text-align:center" placeholder="Password" ng-model="user.password" class="validate" ng-minlength="5" ng-maxlength="30" required>\n' +
    '        </label>\n' +
    '      </div>\n' +
    '      <input type="submit" class="button button-block button-login button-positive" value="Sign Up" ng-disabled="loginForm.$invalid" style="border-radius: 50px;width: 50%;position: relative;margin-left: 95px;;margin-top: 4vh; display:block;">\n' +
    '    </div> -->\n'
  );


  $templateCache.put('app/intro/passwords.html',
    '<!-- File style login.scss\n' +
    '(*) assigned classes -->\n' +
    '\n' +
    '<!-- * view-login / container general -->\n' +
    '<ion-view class="view-login" view-title="Sign Up" style="text-align: center !important">\n' +
    '  <ion-nav-bar class="bar-clear bar-edit-profile" style="background-color:transparent">\n' +
    '    <ion-header-bar align-title="right" style="background-color: transparent !important;">\n' +
    '        <h1 class="title" style="color: white">Next</h1>\n' +
    '    </ion-header-bar>\n' +
    '    <ion-nav-back-button>\n' +
    '    </ion-nav-back-button>\n' +
    '  </ion-nav-bar>\n' +
    '    <!-- * bg-image / background image -->\n' +
    '    <!-- class bg-image is in the file general.scss -->\n' +
    '    <div class="bg-image" style="background-image:url(\'img/bg-2.jpg\');">\n' +
    '        <!-- * bg-color / background-color -->\n' +
    '        <div class="bg-color">\n' +
    '            <ion-content style="background: transparent !important">\n' +
    '              <h1 style="color:white;font-size:24px;">Would you like to be a leader?</h1>\n' +
    '               <h2 style="color:white;font-size:12px;">A leader helps to influence the app community positivily.</h2>\n' +
    '               <ion-radio style="width:30%;background-color:transparent !important;border-color: transparent;margin-left:166px;">Yes</ion-radio>\n' +
    '               <ion-radio style="width:30%;background-color:transparent !important;border-color: transparent;margin-left:166px;">No</ion-radio>\n' +
    '            </ion-content>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</ion-view>\n' +
    '\n' +
    '<!--\n' +
    '    <ion-content cache-view="false" class="auth">\n' +
    '      <form name="registerForm" novalidate ng-submit="registerForm.$valid && register(user)">\n' +
    '        <div class="row row-no-padding category-2-outer" style="padding: 0; margin: 0;">\n' +
    '        <div class="col">\n' +
    '            <div class="category-2-item-wrapper">\n' +
    '              <div class="category-2-item-content">\n' +
    '                <div class = "multi-bg-outer" helper-class="category-with-image" style="background-image: url(img/juggler.jpg);">\n' +
    '                  <div class="logo">\n' +
    '                    <img ng-src = "img/TTG-Logo-NowhiteOutline.png">\n' +
    '                  </div>\n' +
    '                </div>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '      <div class="row text-center" style="color: white;top: 230px;position: absolute;">\n' +
    '        <div class="col" style="z-index: 999;position: relative;display: block;">Sign Up</div>\n' +
    '        <div class="col" style="z-index: 999;position: relative;display: block;" ui-sref="signin">Sign In</div>\n' +
    '      </div>\n' +
    '\n' +
    '      <div class="item no-padding" style="background-color: transparent;border-color: transparent;">\n' +
    '\n' +
    '      <div class="row" style="width: 50%;border-bottom: 1px solid silver; margin:auto;">\n' +
    '        <label class="item item-input" style="border: none; margin-top:2px; text-align:center;width:100%;">\n' +
    '          <input type="text" style="text-align:center" placeholder="First Name" ng-model="user.firstName" validate>\n' +
    '        </label>\n' +
    '      </div>\n' +
    '\n' +
    '      <div class = "row" style="width: 50%;border-bottom: 1px solid silver;margin:auto;">\n' +
    '        <label class="item item-input" style="border: none; margin-top:2px; text-align:center;width:100%;">\n' +
    '          <input type="text" style="text-align:center" placeholder="Last Name" ng-model="user.lastName" validate>\n' +
    '        </label>\n' +
    '      </div>\n' +
    '\n' +
    '       <div class="row" style="width: 80%;border-bottom: 1px solid silver;margin:auto;">\n' +
    '         <label class="item item-input" style="border: none; margin-top:2px; text-align:center;width:100%;">\n' +
    '           <input type="text" style="text-align:center;" placeholder="User Name" ng-model="user.userName" validate>\n' +
    '         </label>\n' +
    '      </div>\n' +
    '      <div class="row" style="width: 90%;border-bottom: 1px solid silver;margin:auto;">\n' +
    '        <label class="item item-input" style="border: none; margin-top:2px; text-align:center;width:100%;">\n' +
    '          <input type="email" style="text-align:center;" placeholder="Email" ng-model="user.email" class="validate" ng-minlength="5" ng-maxlength="30" required>\n' +
    '        </label>\n' +
    '      </div>\n' +
    '      <div class="row" style="width: 50%;border-bottom: 1px solid silver;margin:auto;">\n' +
    '        <label class="item item-input" style="border: none; margin-top:2px; text-align:center;width:100%;">\n' +
    '          <input type="password" style="text-align:center" placeholder="Password" ng-model="user.password" class="validate" ng-minlength="5" ng-maxlength="30" required>\n' +
    '        </label>\n' +
    '      </div>\n' +
    '\n' +
    '      <ion-label style="margin-left:60px;margin-top:6px;">Would you like to be considered a leader?</ion-label>\n' +
    '      <ion-radio ng-model="user.leader" ng-value="\'leader\'" style="width:30%;border-color: #fafafc;margin-left:166px;">Yes</ion-radio>\n' +
    '      <ion-radio ng-model="user.person" ng-value="\'person\'" style="width:30%;border-color: #fafafc;margin-left:166px;">No</ion-radio>\n' +
    '\n' +
    '      <input type="submit" ng-if="user.leader"class="button button-block button-login button-positive" value="Sign Up" ng-disabled="registerForm.$invalid" style="border-radius: 50px;width: 50%;position: relative;margin-left: 103px;margin-top: 4vh; display:block;">\n' +
    '      <input type="submit"  ng-if="!user.leader" class="button button-block button-login button-positive" value="Sign Up" ng-disabled="registerForm.$invalid" style="border-radius: 50px;width: 50%;position: relative;margin-left: 103px;;margin-top: 4vh; display:block;">\n' +
    '      <p ng-if="user.leader || !user.leader" style="text-overflow: initial;white-space: initial;margin-bottom:20px;color: black !important;text-align: center;">By clicking sign up you are indicating that you have read the privacy policy and agree to the Terms of Use found on trainedtoglory.com.</p>\n' +
    '    </div>\n' +
    '  </form>\n' +
    '    </ion-content> -->\n'
  );


  $templateCache.put('app/intro/policy.html',
    '<ion-view hide-nav-bar = "true" cache-view="false">\n' +
    '\n' +
    '  <ion-nav-bar>\n' +
    '    <ion-nav-back-button style="display: block">\n' +
    '    </ion-nav-back-button>\n' +
    '  </ion-nav-bar>\n' +
    '\n' +
    '  <ion-header-bar align-title="left" class="bar bar-header has-tabs-top" style="top: 0 !important;background: #fafafc !important;">\n' +
    '    <button style="display: block; transition-duration: 0ms;" ng-click="$ionicGoBack()" class="button back-button hide buttons  button-clear header-item">\n' +
    '      <i class="icon ion-ios-arrow-back"></i>\n' +
    '      <span class="back-text" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);"></span>\n' +
    '    </button>\n' +
    '    <div class="title title-left header-item" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);">Privacy Policy</div>\n' +
    '  </ion-header-bar>\n' +
    '\n' +
    '    <ion-content scroll="true" overflow-scroll="true" class="iframe-wrapper" style="width: 100%; height:100%; min-height: 100%">\n' +
    '    <!-- <div class="list">\n' +
    '        <div class="item item-divider" style="background-color: white; color: #F10707;">Profile</div>\n' +
    '          <div class="item" ui-sref="tabs.interest">Interest</div>\n' +
    '          <div class="item" ui-sref="tabs.status">Become a Leader</div>\n' +
    '        </div> -->\n' +
    '\n' +
    '      <!-- <div class="list"> -->\n' +
    '           <!-- <div class="item item-divider" style="background-color: white; color: #F10707;font-family: limbus;">Help</div> -->\n' +
    '            <!-- <div> -->\n' +
    '              <!-- Privacy Policy -->\n' +
    '              <iframe src="http://www.trainedtoglory.com/privacy-policy" style="width: 100%; height:100%; min-height: 100%">\n' +
    '            </iframe>\n' +
    '            <!-- </div> -->\n' +
    '            <!-- <div class="item" ng-click="support()" ng-click="view.type = 2">\n' +
    '              Support\n' +
    '\n' +
    '            </div>\n' +
    '            <div class="item" ng-click="service()" ng-click="view.type = 3">\n' +
    '              Terms of Service\n' +
    '            </div>\n' +
    '            <div class = "item" ng-click="logout()">Sign Out</div> -->\n' +
    '      <!-- </div> -->\n' +
    '\n' +
    '    </ion-content>\n' +
    '</ion-view>\n'
  );


  $templateCache.put('app/intro/service.html',
    '<ion-view hide-nav-bar = "true" cache-view="false">\n' +
    '\n' +
    '  <ion-nav-bar>\n' +
    '    <ion-nav-back-button style="display: block">\n' +
    '    </ion-nav-back-button>\n' +
    '  </ion-nav-bar>\n' +
    '\n' +
    '  <ion-header-bar align-title="left" class="bar bar-header has-tabs-top" style="top: 0 !important;background: #fafafc !important;">\n' +
    '    <button style="display: block; transition-duration: 0ms;" ng-click="$ionicGoBack()" class="button back-button hide buttons  button-clear header-item">\n' +
    '      <i class="icon ion-ios-arrow-back"></i>\n' +
    '      <span class="back-text" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);"></span>\n' +
    '    </button>\n' +
    '    <div class="title title-left header-item" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);">Terms of Service</div>\n' +
    '  </ion-header-bar>\n' +
    '\n' +
    '    <ion-content scroll="true" overflow-scroll="true" class="iframe-wrapper" style="width: 100%; height:100%; min-height: 100%">\n' +
    '    <!-- <div class="list">\n' +
    '        <div class="item item-divider" style="background-color: white; color: #F10707;">Profile</div>\n' +
    '          <div class="item" ui-sref="tabs.interest">Interest</div>\n' +
    '          <div class="item" ui-sref="tabs.status">Become a Leader</div>\n' +
    '        </div> -->\n' +
    '\n' +
    '      <!-- <div class="list"> -->\n' +
    '           <!-- <div class="item item-divider" style="background-color: white; color: #F10707;font-family: limbus;">Help</div> -->\n' +
    '            <!-- <div> -->\n' +
    '              <!-- Privacy Policy -->\n' +
    '              <iframe src="http://www.trainedtoglory.com/terms-of-service" style="width: 100%; height:100%; min-height: 100%">\n' +
    '            </iframe>\n' +
    '            <!-- </div> -->\n' +
    '            <!-- <div class="item" ng-click="support()" ng-click="view.type = 2">\n' +
    '              Support\n' +
    '\n' +
    '            </div>\n' +
    '            <div class="item" ng-click="service()" ng-click="view.type = 3">\n' +
    '              Terms of Service\n' +
    '            </div>\n' +
    '            <div class = "item" ng-click="logout()">Sign Out</div> -->\n' +
    '      <!-- </div> -->\n' +
    '\n' +
    '    </ion-content>\n' +
    '</ion-view>\n'
  );


  $templateCache.put('app/intro/signin.html',
    '\n' +
    '<!-- File style login.scss\n' +
    '(*) assigned classes -->\n' +
    '\n' +
    '<!-- * view-login / container general -->\n' +
    '<ion-view hide-nav-bar="true">\n' +
    '  <!-- <ion-header-bar align-title="center" class="bar bar-header has-tabs-top" style="top: 0 !important;box-shadow:none !important;background: #fafafc !important;">\n' +
    '    <div class="title title-center header-item" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);">Glory</div>\n' +
    '  </ion-header-bar> -->\n' +
    '<!-- * bg-image / background image -->\n' +
    '<!-- class bg-image is in the file general.scss -->\n' +
    '  <!-- * bg-color / background-color -->\n' +
    '  <div class="bg-image" style="background-image:url(\'img/thinking-2.jpg\');">\n' +
    '      <ion-content style="background: transparent !important;overflow:scroll" class="auth profile has-header bt-grey">\n' +
    '          <!-- * logo / logo company -->\n' +
    '          <div class="logo">\n' +
    '              <img ng-src="img/TTG-Symbol-2015-02.png" alt="logo" style="height: 160px;">\n' +
    '          </div>\n' +
    '          <form novalidate name="loginForm" ng-submit="loginForm.$valid && login(user)" style="position: relative">\n' +
    '              <div class="list list-inset" style="background-color:transparent !important;padding-top: 23vh;margin-right: 0;">\n' +
    '                <div class = "row" style="width: 100%;border-bottom: 1px solid white;margin:auto;margin-bottom: 25px;">\n' +
    '                  <label class="item item-input" style="border: none;background-color:transparent !important;margin-top:2px; text-align:center;width:100%;">\n' +
    '                    <i class="icon ion-ios-email placeholder-icon" style="font-size: 32px;color: white;"></i>\n' +
    '                    <input class = "validate signin" style="color: white" type="text" placeholder="Email" ng-model="user.email" ng-minlength="5" ng-maxlength="30" required>\n' +
    '                  </label>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class = "row" style="width: 100%;border-bottom: 1px solid white;margin:auto;margin-bottom: 25px;">\n' +
    '                  <label class="item item-input" style="border: none;background-color:transparent !important;margin-top:2px; text-align:center;width:100%;">\n' +
    '                    <i class="icon ion-ios-locked placeholder-icon" style="font-size: 32px;color: white;"></i>\n' +
    '                    <input class = "validate signin" style="color: white" type="password" placeholder="Password" ng-model="user.password" ng-minlength="5" ng-maxlength="30" required>\n' +
    '                  </label>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class = "row">\n' +
    '                  <button class = "col button-clear" style="font-size: 16px; font-weight: 400;text-align: right;color: white;margin-bottom:70px;" ng-click="openForgot()">Forgot</button>\n' +
    '                </div>\n' +
    '                  <button class="button button-block button-calm" type="submit" style="display: block;position: relative;margin: 0 auto;width: 95%;border-radius: 0px;background-color: white;color: black;">SIGN IN</button>\n' +
    '                  <button class="button button-block button-calm" type="submit" style="display: block;position: relative;margin: 0 auto;width: 95%;border-radius: 0px;background-color: transparent;margin-top: 20px;"  ui-sref="authentication">SIGN UP</button>\n' +
    '              </div>\n' +
    '          </form>\n' +
    '      </ion-content>\n' +
    '    </div>\n' +
    '</ion-view>\n' +
    '\n' +
    '\n' +
    '                <!-- <i class="icon ion-ios-email placeholder-icon" style="font-size: 32px;position: fixed;color: white;display: inline-flex;left: 6%;margin-top: 17px;"></i>\n' +
    '                <div class = "item" style="border-bottom: 1px solid white;padding-left:0;padding-bottom: 0;border-top: none;border-left: none;border-right: none;margin:auto;margin-bottom: 10px;background-color: transparent !important;width: 85%;padding-right: 0;margin-right: 0;">\n' +
    '                    <input type="text"  class="validate signin" style="color: white !important;width: 100%;background-color: transparent;" placeholder="Email" ng-model="user.email" ng-minlength="5" ng-maxlength="30" required>\n' +
    '                </div>\n' +
    '\n' +
    '                <i class="icon ion-ios-locked placeholder-icon" style="font-size: 32px;position: fixed;display: inline-flex;left: 6%;color: white"></i>\n' +
    '                <div class = "item"  style="padding-left:0;padding-bottom: 0;border: none;margin:auto;margin-bottom: 16px;background-color: transparent !important;width: 85%;padding-right: 0;margin-right: 0;padding-top: 0;">\n' +
    '                    <input class="validate signin" type="password" style="color: white !important;width: 100%;background-color: transparent;" placeholder="Password" ng-model="user.password" ng-minlength="5" ng-maxlength="30" required>\n' +
    '                </div> -->\n'
  );


  $templateCache.put('app/intro/support.html',
    '<ion-view hide-nav-bar = "true" cache-view="false">\n' +
    '\n' +
    '  <ion-nav-bar>\n' +
    '    <ion-nav-back-button style="display: block">\n' +
    '    </ion-nav-back-button>\n' +
    '  </ion-nav-bar>\n' +
    '\n' +
    '  <ion-header-bar align-title="left" class="bar bar-header has-tabs-top" style="top: 0 !important;background: #fafafc !important;">\n' +
    '    <button style="display: block; transition-duration: 0ms;" ng-click="$ionicGoBack()" class="button back-button hide buttons  button-clear header-item">\n' +
    '      <i class="icon ion-ios-arrow-back"></i>\n' +
    '      <span class="back-text" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);"></span>\n' +
    '    </button>\n' +
    '    <div class="title title-left header-item" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);">Support</div>\n' +
    '  </ion-header-bar>\n' +
    '\n' +
    '    <ion-content scroll="true" overflow-scroll="true" class="iframe-wrapper" style="width: 100%; height:100%; min-height: 100%">\n' +
    '    <!-- <div class="list">\n' +
    '        <div class="item item-divider" style="background-color: white; color: #F10707;">Profile</div>\n' +
    '          <div class="item" ui-sref="tabs.interest">Interest</div>\n' +
    '          <div class="item" ui-sref="tabs.status">Become a Leader</div>\n' +
    '        </div> -->\n' +
    '\n' +
    '      <!-- <div class="list"> -->\n' +
    '           <!-- <div class="item item-divider" style="background-color: white; color: #F10707;font-family: limbus;">Help</div> -->\n' +
    '            <!-- <div> -->\n' +
    '              <!-- Privacy Policy -->\n' +
    '              <iframe src="http://www.trainedtoglory.com/" style="width: 100%; height:100%; min-height: 100%">\n' +
    '            </iframe>\n' +
    '            <!-- </div> -->\n' +
    '            <!-- <div class="item" ng-click="support()" ng-click="view.type = 2">\n' +
    '              Support\n' +
    '\n' +
    '            </div>\n' +
    '            <div class="item" ng-click="service()" ng-click="view.type = 3">\n' +
    '              Terms of Service\n' +
    '            </div>\n' +
    '            <div class = "item" ng-click="logout()">Sign Out</div> -->\n' +
    '      <!-- </div> -->\n' +
    '\n' +
    '    </ion-content>\n' +
    '</ion-view>\n'
  );


  $templateCache.put('app/news/comments.html',
    '<ion-view hide-nav-bar="true" class="bg-lightgrey" cache-view="false">\n' +
    '\n' +
    '    <ion-header-bar class="no-bg" style="box-shadow: none;top: 0 !important;">\n' +
    '        <h1 class="title"></h1>\n' +
    '        <button class="button button-icon button-clear button-light ion-android-close" ng-click="goBack(\'tabs.post-detail\')"></button>\n' +
    '    </ion-header-bar>\n' +
    '\n' +
    '    <ion-content class="has-header">\n' +
    '\n' +
    '        <div class="row text-center">\n' +
    '            <div class="col font-thin" ng-class="{\'text-medium balanced\' : viewType === \'Commits\'}" ng-click="viewType = \'Commits\'">Commits</div>\n' +
    '            <div class="col font-thin" ng-class="{\'text-medium balanced\' : viewType === \'Likes\'}" ng-click="viewType = \'Likes\'">Likes</div>\n' +
    '            <div class="col font-thin" ng-class="{\'text-medium balanced\' : viewType === \'Comment\'}" ng-click="viewType = \'Comment\'">Comments</div>\n' +
    '        </div>\n' +
    '        <div class="list" ng-if = "viewType == \'Comment\'">\n' +
    '          <div ng-show="waiting == true" style="text-align:center;margin-top:40px;">\n' +
    '            <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>\n' +
    '          </div>\n' +
    '          <div ng-if = "commentsLength == 0" style="text-align: center;color: black;margin-top: 20px;">There are no comments on this post.</div>\n' +
    '            <div class="item item-avatar item-text-wrap" ng-repeat="comment in comments" ng-if="comment.comment" style = "border: none">\n' +
    '                <img ng-src="{{comment.userPhoto}}" fallback-src="img/profile-picture.png">\n' +
    '                <h2 class = "lead" style="font-weight: 400 !important;">{{comment.userName}}</h2>\n' +
    '                <p>{{comment.comment}}</p>\n' +
    '                <p style="color:black !important; letter-spacing: 1.5px;font-size: 12px;" am-time-ago="{{comment.created}}" class="font-thin"></p>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="list" ng-if = "viewType == \'Likes\'">\n' +
    '          <div ng-show="faster == true" style="text-align:center;margin-top:40px;">\n' +
    '            <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>\n' +
    '          </div>\n' +
    '          <div ng-if = "likesLength == 0" style="text-align: center;color: black;margin-top: 20px;">There are no likes on this post.</div>\n' +
    '            <div class="item item-avatar item-button-right followers" ng-repeat="liker in likes" style = "border: none">\n' +
    '                <img ng-src="{{liker.userPhoto}}" fallback-src="img/profile-picture.png">\n' +
    '                <h2 class = "lead" style="font-weight: 400 !important;">{{liker.userName}}</h2>\n' +
    '                <p style="color:black !important; letter-spacing: 1.5px;font-size: 12px;" am-time-ago="{{liker.created}}" class="font-thin"></p>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="list" ng-if = "viewType == \'Commits\'">\n' +
    '          <div ng-show="loading == true" style="text-align:center;margin-top:40px;">\n' +
    '            <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>\n' +
    '          </div>\n' +
    '          <div ng-if = "commitsLength == 0" style="text-align: center;color: black;margin-top: 20px;">There are no commits on this post.</div>\n' +
    '            <div class="item item-avatar item-button-right followers" ng-repeat="commiter in commits" style = "border: none">\n' +
    '                <img ng-src="{{commiter.userPhoto}}" fallback-src="img/profile-picture.png">\n' +
    '                <h2 class="lead" style="font-weight: 400 !important;">{{commiter.userName}}</h2>\n' +
    '                <p style="color:black !important; letter-spacing: 1.5px;font-size: 12px;" am-time-ago="{{commiter.created}}" class="font-thin"></p>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '\n' +
    '    <ion-footer-bar class="bar-light item-input-inset" style="border-top:1px solid #ccc;" ng-form="chatForm" novalidate>\n' +
    '        <label class="item-input-wrapper no-bg">\n' +
    '        <textarea id="textChat" ng-model="formData.comment" placeholder="Comment" required minlength="1" maxlength="1500" style="width:100%;resize: none;" msd-elastic></textarea>\n' +
    '    </label>\n' +
    '      <button class="button button-clear button-icon ion-android-send button-calm" ng-click="createComment(formData.comment)"></button>\n' +
    '    </button>\n' +
    '    </ion-footer-bar>\n' +
    '\n' +
    '</ion-view>\n'
  );


  $templateCache.put('app/news/commits.html',
    '<ion-view hide-nav-bar="true" class="bg-lightgrey" cache-view="false">\n' +
    '\n' +
    '    <ion-header-bar class="no-bg">\n' +
    '        <h1 class="title"></h1>\n' +
    '        <button class="button button-icon button-clear button-light ion-android-close" ng-click="goBack(\'tabs.post-detail\')"></button>\n' +
    '    </ion-header-bar>\n' +
    '\n' +
    '    <ion-content class="has-header">\n' +
    '\n' +
    '        <div class="row text-center">\n' +
    '             <div class="col font-thin text-large balanced commits">Commits</div>\n' +
    '            <div class="col font-thin" ui-sref="tabs.likes({post:post})">Likes</div>\n' +
    '            <div class="col font-thin" ui-sref="tabs.comments({post:post})">Comments</div>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="list">\n' +
    '            <div class="item item-avatar" ng-repeat="(key, commit) in commits">\n' +
    '                <img ng-src="{{commit.userPhoto}}">\n' +
    '                <h2 class="lead">{{commit.userName}}</h2>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '\n' +
    '    </ion-content>\n' +
    '</ion-view>\n'
  );


  $templateCache.put('app/news/event.html',
    '<ion-view hide-nav-bar="true" class="bg-lightgrey" cache-view = "false">\n' +
    '\n' +
    '  <ion-header-bar style="background-color: #fafafc;height: 48px;top: 0px !important;position: absolute;">\n' +
    '        <div class="row text-center">\n' +
    '          <div class="col font-thin text-large dark" ng-click="$ionicGoBack()" style="color:gray;">Cancel</div>\n' +
    '            <div class="col font-thin text-large balanced bl-grey profile" style="color:green;" ng-if="!post.created" ng-click="createEvent()">Send</div>\n' +
    '            <div class="col font-thin text-large balanced bl-grey profile" style="color:green;" ng-if="post.created" ng-click="updateEvent()">Send</div>\n' +
    '        </div>\n' +
    '    </ion-header-bar>\n' +
    '\n' +
    '  <ion-content class="has-header" style="top: 44px !important;">\n' +
    '    <div class="event-form" style="height: 283px">\n' +
    '      <div class="list edit padding-horizontal padding-vertical" style="padding:0;height: 283px">\n' +
    '        <div style="height: 283px" ng-if = "view.type === 1">\n' +
    '          <label class="item item-input event__input" ng-click="uploadEventPhoto()" ng-if = "view.type === 1">\n' +
    '            <div class="card image" style="background:transparent !important; box-shadow:none;margin: 0">\n' +
    '                  <div class="item item-image" ng-if = "view.type === 1">\n' +
    '                    <img class="plan_picture" ng-src = "img/event-photo.jpg" name = "photo" ng-model="photo">\n' +
    '                  </div>\n' +
    '              </div>\n' +
    '              <a class="btn-floating btn-small waves-effect waves-light lighten-1" ng-if = "view.type === 1" style="top: -113px;z-index: 5;left: 5px;background-color: white;width:42px;height:42px;line-height: 42px;" ng-click="uploadEventPhoto()">\n' +
    '                <i class="icon ion-ios-camera" style="color: black;display: inherit;font-size: 24px;margin:auto;position: inherit;margin-top: 3%;margin-left: -1%"></i>\n' +
    '              </a>\n' +
    '          </label>\n' +
    '        </div>\n' +
    '\n' +
    '          <div class="list card" style="box-shadow: none;margin-left:0;margin-right:0;margin-top: 0;margin: 0;padding: 0;" ng-click="uploadEventPhoto()" ng-if="view.type === 2">\n' +
    '            <div class="item item-image" style="max-height: 500px;box-shadow: none;margin-left:0;margin-right:0;padding: 0;margin: 0;" ng-click="uploadEventPhoto()">\n' +
    '                <img ng-src="{{photo}}" name = "photo" ng-model="photo">\n' +
    '              </div>\n' +
    '          </div>\n' +
    '\n' +
    '          <label class="item item-input event__input" style="margin-bottom:15px;padding-top: 20px;">\n' +
    '            <input type="text" placeholder="" name="description" style="margin-left:5px;font-weight:300">{{post.description}}\n' +
    '            <span class="input-label" style="margin-left:5px">Description</span>\n' +
    '          </label>\n' +
    '\n' +
    '          <label class="item item-input event__input" style="margin-bottom:15px">\n' +
    '            <input type="text" placeholder="" name="location" style="margin-left:5px;font-weight:300">{{post.location}}\n' +
    '            <span class="input-label" style="margin-left:5px">Location</span>\n' +
    '          </label>\n' +
    '\n' +
    '          <label class="item item-input event__input">\n' +
    '            <input type="datetime-local" displayFormat="MM/YYYY" name="date" placeholder="" style="margin-left:5px;font-weight:300">{{post.date}}\n' +
    '            <span class="input-label" style="margin-left:5px">Date/Time</span>\n' +
    '          </label>\n' +
    '\n' +
    '        </div>\n' +
    '    </div>\n' +
    '  </ion-content>\n' +
    '\n' +
    '</ion-view>\n'
  );


  $templateCache.put('app/news/explore.html',
    '<ion-view title="Discover" class="view-browse" hide-nav-bar="true">\n' +
    '\n' +
    '  <ion-nav-buttons side="right">\n' +
    '        <button class="button button-dark button-clear icon ion-ios-search" ng-click="searchPopover.show($event)" style="margin-right: 30px"></button>\n' +
    '        <button class="button button-dark button-clear icon ion-android-more-vertical" style="margin-right: 10px;" style="z-index: 999" ui-sref="settings"></button>\n' +
    '    </ion-nav-buttons>\n' +
    '\n' +
    '    <ion-content style="top:9px !important" on-swipe-left="onSwipeLeft()" on-swipe-right="onSwipeRight()">\n' +
    '      <ion-refresher on-refresh="doRefresh()" icon="spiral" class="spinner-positive"></ion-refresher>\n' +
    '      <div class="list list-inset" style="top: 60px;margin-bottom: 20px;z-index: 1; box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.2);">\n' +
    '        <label class="item item-input" ng-click="view.type = 2">\n' +
    '          <i class="icon ion-ios-search placeholder-icon" style="font-size: 24px;color: rgba(17, 17, 17, 0.54);display: inline-flex"></i>\n' +
    '          <input type="text" ng-model="lookUp" class="search-people" placeholder="Search People" style = "margin-left: 2%;color: gray; font-size: 16px;width: 75%;padding-right:0px;display: inline-flex;height: 2.25em;line-height: 2.28em;">\n' +
    '        </label>\n' +
    '        <a class="clear" ng-click="lookUp = null">\n' +
    '        <i  ng-if = "view.type === 2" class = "ion-ios-close-empty placeholder-icon" style="font-size: 24px;font-size: 32px;right: 12px;position: absolute;z-index: 999;top: 9px;" ng-click="clearSearch()"></i>\n' +
    '      </a>\n' +
    '      </div>\n' +
    '      <div ng-if="view.type === 2" style="top: 120px;margin-top: 80px;">\n' +
    '        <div class="list card" style="background: transparent; box-shadow: none;">\n' +
    '            <div class="item item-avatar item-text-wrap" style="border-color: #fafafc;" ng-repeat="user in users | fuzzyBy: \'userName\': lookUp " ui-sref="friend({contact: user.userId})">\n' +
    '                <img ng-src="{{user.userPhoto}}" fallback-src="img/profile-picture.png">\n' +
    '                <h2 class="lead" style="font-weight: 400 !important">{{user.userName}}</h2>\n' +
    '              </div>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '\n' +
    '      <div ng-show="loading == true" style="text-align:center;margin-top:80px;">\n' +
    '        <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>\n' +
    '      </div>\n' +
    '\n' +
    '      <div ng-if="view.type === 1" style="top: 120px;margin-top: 80px;">\n' +
    '        <div style="height:100%;margin-top: 50px;" >\n' +
    '            <div class="row row-no-padding category-2-outer" ng-repeat="value in news" ng-if="$index % 2 == 0 && news[$index].photo">\n' +
    '              <div class="col" style="padding: 5px !important">\n' +
    '                <a ui-sref="post-detail({post:news[$index].key})">\n' +
    '                  <div class="category-2-item-wrapper">\n' +
    '                    <div class="category-2-item-content">\n' +
    '                      <div class = "multi-bg-outer" style="background-image: url({{news[$index].photo}}); background-color: transparent;z-index:5">\n' +
    '                      </div>\n' +
    '                    </div>\n' +
    '                  </div>\n' +
    '                </a>\n' +
    '              </div>\n' +
    '              <div class="col" style="padding: 5px !important ">\n' +
    '                <a ui-sref="post-detail({post:news[$index+1].key})">\n' +
    '                  <div class="category-2-item-wrapper">\n' +
    '                    <div class="category-2-item-content">\n' +
    '                      <div class = "multi-bg-outer" style="background-image: url({{news[$index+1].photo}}); background-color: transparent;z-index:5">\n' +
    '                      </div>\n' +
    '                    </div>\n' +
    '                  </div>\n' +
    '                </a>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '        <ion-infinite-scroll ng-if="!noMoreItemsAvailable" icon="spiral" on-infinite="loadMore()" distance="10%"></ion-infinite-scroll>\n' +
    '    </ion-content>\n' +
    '</ion-view>\n'
  );


  $templateCache.put('app/news/likes.html',
    '<ion-view hide-nav-bar="true" class="bg-lightgrey" cache-view="false">\n' +
    '\n' +
    '    <ion-header-bar class="no-bg">\n' +
    '        <h1 class="title"></h1>\n' +
    '        <button class="button button-icon button-clear button-light ion-android-close" ng-click="goBack(\'tabs.post-detail\')"></button>\n' +
    '    </ion-header-bar>\n' +
    '\n' +
    '    <ion-content class="has-header">\n' +
    '\n' +
    '        <div class="row text-center">\n' +
    '             <div class="col font-thin" ui-sref="tabs.commits({post:post})">Commits</div>\n' +
    '            <div class="col font-thin text-large balanced likes">Likes</div>\n' +
    '            <div class="col font-thin" ui-sref="tabs.comments({post:post})">Comments</div>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="list">\n' +
    '            <div class="item item-avatar" ng-repeat="(key, liker) in likes">\n' +
    '                <img ng-src="{{liker.userPhoto}}">\n' +
    '                <h2 class="lead">{{liker.userName}}</h2>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '\n' +
    '    </ion-content>\n' +
    '</ion-view>\n'
  );


  $templateCache.put('app/news/news.html',
    '<ion-view view-title="Home" class="font-thin" style="background:#fafafc;margin-left: 0 !important" hide-nav-bar="true">\n' +
    '  <ion-nav-buttons side="right">\n' +
    '        <button class="button button-dark button-clear icon ion-android-more-vertical" style="margin-right: 10px;z-index: 999;" ui-sref="settings"></button>\n' +
    '    </ion-nav-buttons>\n' +
    '\n' +
    '    <nav mfb-menu position="br" effect="fountain"\n' +
    '         active-icon="ion-close-round" resting-icon="ion-plus-round"\n' +
    '         toggling-method="click">\n' +
    '      <button mfb-button icon="ion-ios-camera" label="Create Post"  ui-sref="regular"></button>\n' +
    '      <button mfb-button icon="ion-ios-bell" label="Create Event"  ui-sref="event"></button>\n' +
    '      <button mfb-button icon="ion-ios-star" label="Create Goal"  ui-sref="create-plan"></button>\n' +
    '    </nav>\n' +
    '\n' +
    '    <ion-content class="has-tabs-top">\n' +
    '      <ion-refresher on-refresh="doRefresh()" icon="spiral" class="spinner-positive"></ion-refresher>\n' +
    '      <div ng-show="loading == true" style="text-align:center;margin-top:40px;">\n' +
    '        <ion-spinner icon="spiral" class="spinner-positive"></ion-spinner>\n' +
    '      </div>\n' +
    '      <div ng-repeat="posts in (totalPost.photos | orderBy: \'created\': true) track by $index" style="-webkit-transform: translateZ(0);-webkit-backface-visibility: hidden;">\n' +
    '      <div class="list card"  on-swipe-left="onSwipeLeft()" ng-if="posts.state.visible" style="box-shadow: none;margin-left:0;margin-right:0;-webkit-transform: translateZ(0);-webkit-backface-visibility: hidden;transform: translateZ(0);backface-visibility: hidden;">\n' +
    '          <div class="item item-image" ui-sref="post-detail({post:posts.key})" style="max-height: 500px;">\n' +
    '              <img ng-src="{{posts.photo}}" fallback-src = "img/grayBackground.jpg" style="-webkit-transform: translateZ(0);-webkit-backface-visibility: hidden;transform: translateZ(0);backface-visibility: hidden;"/>\n' +
    '            </div>\n' +
    '          <div class="item item-avatar" style="border: none; padding-bottom: 0px;">\n' +
    '            <img ng-src="{{posts.avatar}}" style="background-color: transparent;-webkit-transform: translateZ(0);-webkit-backface-visibility: hidden;transform: translateZ(0);backface-visibility: hidden;" fallback-src="img/profile-picture.png" ui-sref="friend({contact:posts.createdBy})"/>\n' +
    '            <h2 class = "lead" style="font-weight: 400 !important;" ui-sref="friend({contact:posts.createdBy})">{{posts.owner}}</h2>\n' +
    '            <p style="color:black !important;letter-spacing: 1.5px;font-size: 12px;" class="font-thin">{{posts.description}}</p>\n' +
    '            <p style="color:black !important; letter-spacing: 1.5px;font-size: 12px;" class="font-thin">{{posts.postType}}</p>\n' +
    '            <p style="color:black !important; letter-spacing: 1.5px;font-size: 12px;" am-time-ago="{{posts.created}}" class="font-thin"></p>\n' +
    '          </div>\n' +
    '          <a class="item" ng-if = "posts.postType === \'Event\'" style = "display: inline-flex;font-size:14px;letter-spacing: 1px;border: none;" ng-click="toggleCommit(posts.key,userId)">\n' +
    '            {{posts.totalCommits}} Commits\n' +
    '          </a>\n' +
    '          <a class="item" ng-click="toggleLike(posts.key, userId)" style = "display: inline-flex;font-size: 14px;border: none;letter-spacing: 1px;">\n' +
    '            {{posts.totalLikes}} Likes\n' +
    '          </a>\n' +
    '          <a class="item" ng-click="toggleLike(posts.key, userId)" style = "display: inline-flex;font-size: 14px; border: none;letter-spacing: 1px;">\n' +
    '            {{posts.totalComments}} Comments\n' +
    '          </a>\n' +
    '        </div>\n' +
    '        <!--connect-->\n' +
    '        <div style="border: none;font-weight: 400;margin-top: 40px;font-size: 20px;color: #F10707 !important;" ng-if = "$index == 6" class = "item item-divider">Connect</div>\n' +
    '        <div style="border: none;font-weight: 400" ng-if = "$index == 6" class = "item item-divider">Trending now</div>\n' +
    '        <ion-scroll direction="x" ng-if = "$index == 6" style="margin-bottom: 60px;">\n' +
    '          <div class="row" style="width: 263vh;height: 325px;padding-top: 0">\n' +
    '            <div ui-sref="contacts({activity:connections.id, type: \'Connect\'})" class="col item-image card" ng-repeat = "connections in totalPost.connect" style="padding: 0;margin-right: 2px;">\n' +
    '              <img ng-src="{{connections.src}}" fallback-src = "img/grayBackground.jpg" style="height: 72%;max-height: 187px;"/>\n' +
    '                <p style="font-weight: 400 !important;margin-top: 5px;text-align: left;margin-left: 5px;color: black !important;">{{connections.label}}</p>\n' +
    '                <p style="color:black !important;text-align: left;letter-spacing: 1.5px;font-size: 12px;margin-left: 5px;" class="font-thin">{{connections.description}}</p>\n' +
    '            </div>\n' +
    '          </div>\n' +
    '        </ion-scroll>\n' +
    '\n' +
    '        <div style="border: none;font-weight: 400;margin-top: 40px;font-size: 20px;color: #F10707 !important;" ng-if = "$index == 20" class = "item item-divider">Connect</div>\n' +
    '        <div style="border: none;font-weight: 400 !important;" ng-if = "$index == 20" class = "item item-divider">Trending now</div>\n' +
    '        <ion-scroll direction="x" ng-if = "$index == 20" style="margin-bottom: 60px;">\n' +
    '          <div class="row" style="width: 263vh;height: 325px;padding-top: 0">\n' +
    '            <div ui-sref="contacts({activity:connections.id, type: \'Connect\'})" class="col item-image card" ng-repeat = "connections in totalPost.together" style="padding: 0;margin-right: 2px;">\n' +
    '              <img ng-src="{{connections.src}}" fallback-src = "img/grayBackground.jpg" style="height: 72%;max-height: 187px;"/>\n' +
    '                <p style="font-weight: 400 !important;margin-top: 5px;text-align: left;margin-left: 5px;color: black !important;">{{connections.label}}</p>\n' +
    '                <p style="color:black !important;text-align: left;letter-spacing: 1.5px;font-size: 12px;margin-left: 5px;" class="font-thin">{{connections.description}}</p>\n' +
    '            </div>\n' +
    '          </div>\n' +
    '        </ion-scroll>\n' +
    '\n' +
    '        <div style="border: none;font-weight: 400;margin-top: 40px;font-size: 20px;color: #F10707 !important;" ng-if = "$index == 34" class = "item item-divider">Connect</div>\n' +
    '        <div style="border: none;font-weight: 400 !important;" ng-if = "$index == 34" class = "item item-divider">Trending now</div>\n' +
    '        <ion-scroll direction="x" ng-if = "$index == 34" style="margin-bottom: 60px;">\n' +
    '          <div class="row" style="width: 263vh;height: 325px;padding-top: 0">\n' +
    '            <div ui-sref="contacts({activity:connections.id, type: \'Connect\'})" class="col item-image card" ng-repeat = "connections in totalPost.unite" style="padding: 0;margin-right: 2px;">\n' +
    '              <img ng-src="{{connections.src}}" fallback-src = "img/grayBackground.jpg" style="height: 72%;max-height: 187px;"/>\n' +
    '                <p style="font-weight: 400 !important;margin-top: 5px;text-align: left;margin-left: 5px;color: black !important;">{{connections.label}}</p>\n' +
    '                <p style="color:black !important;text-align: left;letter-spacing: 1.5px;font-size: 12px;margin-left: 5px;" class="font-thin">{{connections.description}}</p>\n' +
    '            </div>\n' +
    '          </div>\n' +
    '        </ion-scroll>\n' +
    '\n' +
    '        <!--Leaders -->\n' +
    '        <div style="border: none;font-weight: 400;margin-top: 40px;font-size: 20px;color: #F10707 !important;" ng-if = "$index == 13" class = "item item-divider">Leaders</div>\n' +
    '        <div style="border: none;font-weight: 400 !important;" ng-if = "$index == 13" class = "item item-divider">Trending now</div>\n' +
    '        <ion-scroll direction="x" ng-if = "$index == 13" style="margin-bottom: 60px;">\n' +
    '          <div class="row" style="width: 263vh;height: 325px;padding-top: 0;">\n' +
    '            <div ui-sref="contactLeader({activity:connections.id, type: \'Leaders\'})" class="col item-image card" ng-repeat = "connections in totalPost.leader | limitTo: 5" style="padding: 0;margin-right: 2px;">\n' +
    '              <img ng-src="{{connections.src}}" fallback-src = "img/grayBackground.jpg" style="height: 72%;max-height: 187px;"/>\n' +
    '                <p style="font-weight: 400 !important;margin-top: 5px;text-align: left;margin-left: 5px;color: black !important;">{{connections.label}}</p>\n' +
    '                <p style="color:black !important;text-align: left;letter-spacing: 1.5px;font-size: 12px;margin-left: 5px;" class="font-thin">{{connections.description}}</p>\n' +
    '            </div>\n' +
    '          </div>\n' +
    '        </ion-scroll>\n' +
    '\n' +
    '        <div style="border: none;font-weight: 400;margin-top: 40px;font-size: 20px;color: #F10707 !important;" ng-if = "$index == 27" class = "item item-divider">Leaders</div>\n' +
    '        <div style="border: none;font-weight: 400 !important;" ng-if = "$index == 27" class = "item item-divider">Trending now</div>\n' +
    '        <ion-scroll direction="x" ng-if = "$index == 27" style="margin-bottom: 60px;">\n' +
    '          <div class="row" style="width: 263vh;height: 325px;padding-top: 0;">\n' +
    '            <div ui-sref="contactLeader({activity:connections.id, type: \'Leaders\'})" class="col item-image card" ng-repeat = "connections in totalPost.coach | limitTo: 5" style="padding: 0;margin-right: 2px;">\n' +
    '              <img ng-src="{{connections.src}}" fallback-src = "img/grayBackground.jpg" style="height: 72%;max-height: 187px;"/>\n' +
    '                <p style="font-weight: 400 !important;margin-top: 5px;text-align: left;margin-left: 5px;color: black !important;">{{connections.label}}</p>\n' +
    '                <p style="color:black !important;text-align: left;letter-spacing: 1.5px;font-size: 12px;margin-left: 5px;" class="font-thin">{{connections.description}}</p>\n' +
    '            </div>\n' +
    '          </div>\n' +
    '        </ion-scroll>\n' +
    '\n' +
    '        <div style="border: none;font-weight: 400;margin-top: 40px;font-size: 20px;color: #F10707 !important;" ng-if = "$index == 41" class = "item item-divider">Leaders</div>\n' +
    '        <div style="border: none;font-weight: 400 !important;" ng-if = "$index == 41" class = "item item-divider">Trending now</div>\n' +
    '        <ion-scroll direction="x" ng-if = "$index == 41" style="margin-bottom: 60px;">\n' +
    '          <div class="row" style="width: 263vh;height: 325px;padding-top: 0;">\n' +
    '            <div ui-sref="contactLeader({activity:connections.id, type: \'Leaders\'})" class="col item-image card" ng-repeat = "connections in totalPost.mentor | limitTo: 5" style="padding: 0;margin-right: 2px;">\n' +
    '              <img ng-src="{{connections.src}}" fallback-src = "img/grayBackground.jpg" style="height: 72%;max-height: 187px;"/>\n' +
    '                <p style="font-weight: 400 !important;margin-top: 5px;text-align: left;margin-left: 5px;color: black !important;">{{connections.label}}</p>\n' +
    '                <p style="color:black !important;text-align: left;letter-spacing: 1.5px;font-size: 12px;margin-left: 5px;" class="font-thin">{{connections.description}}</p>\n' +
    '            </div>\n' +
    '          </div>\n' +
    '        </ion-scroll>\n' +
    '      </div>\n' +
    '\n' +
    '      <ion-infinite-scroll ng-if="!noMoreItemsAvailable" icon="spiral" class="spinner-positive" on-infinite="loadMore()" distance="10%"></ion-infinite-scroll>\n' +
    '    </ion-content>\n' +
    '</ion-view>\n'
  );


  $templateCache.put('app/news/plan.html',
    '<ion-view hide-nav-bar = "true">\n' +
    '\n' +
    '  <ion-nav-bar>\n' +
    '    <ion-nav-back-button style="display: block">\n' +
    '    </ion-nav-back-button>\n' +
    '  </ion-nav-bar>\n' +
    '\n' +
    '  <ion-header-bar align-title="left" class="bar bar-header has-tabs-top" style="top: 0 !important;background: #fafafc !important;">\n' +
    '    <button style="display: block; transition-duration: 0ms;" ng-click="$ionicGoBack()" class="button back-button hide buttons  button-clear header-item">\n' +
    '      <i class="icon ion-ios-arrow-back"></i>\n' +
    '      <span class="back-text" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);"></span>\n' +
    '    </button>\n' +
    '    <div class="title title-left header-item" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);">Goal</div>\n' +
    '  </ion-header-bar>\n' +
    '\n' +
    '    <ion-content class="has-header" style="top: 0;" padding="false">\n' +
    '      <div class="list card" style="box-shadow: none;margin-left:0;margin-right:0;">\n' +
    '        <div class="item item-image" style="max-height: 500px;">\n' +
    '            <img ng-src="{{plan.photo}}" >\n' +
    '          </div>\n' +
    '        <div class="item item-avatar" style="border: none; padding-bottom: 0px;">\n' +
    '          <img ng-src="{{plan.avatar}}" style="background-color: transparent" fallback-src="img/profile-picture.png">\n' +
    '          <div class="button button-dark button-clear icon ion-android-more-vertical" style="display: block;right: 0;position: fixed;margin-top: -11px" ng-click="showPopup()"></div>\n' +
    '          <h2 class = "lead" style="font-weight: 400 !important;">{{plan.owner}}</h2>\n' +
    '          <p style="color:black !important;letter-spacing: 1.5px;font-size: 12px;" class="font-thin">{{plan.description}}</p>\n' +
    '          <p style="color:black !important;letter-spacing: 1.5px;font-size: 12px;" class="font-thin">{{plan.location}}</p>\n' +
    '          <p style="color:black !important; letter-spacing: 1.5px;font-size: 12px" class="font-thin">{{plan.postType}}</p>\n' +
    '          <p style="color:black !important; letter-spacing: 1.5px;font-size: 12px;" am-time-ago="{{plan.created}}" class="font-thin"></p>\n' +
    '        </div>\n' +
    '      </div>\n' +
    '\n' +
    '    </ion-content>\n' +
    '</ion-view>\n'
  );


  $templateCache.put('app/news/popover.html',
    '<ion-popover-view style="height: 120px !important;width: 100%;">\n' +
    '    <ion-content>\n' +
    '      <div class="list">\n' +
    '        <a class="item" target="_blank">\n' +
    '          Report\n' +
    '        </a>\n' +
    '        <a class="item" target="_blank">\n' +
    '        Share\n' +
    '        </a>\n' +
    '      </div>\n' +
    '    </ion-content>\n' +
    '  </ion-popover-view>\n'
  );


  $templateCache.put('app/news/post.html',
    '<ion-view hide-nav-bar = "true" cache-view="false">\n' +
    '\n' +
    '  <ion-nav-bar>\n' +
    '    <ion-nav-back-button style="display: block">\n' +
    '    </ion-nav-back-button>\n' +
    '  </ion-nav-bar>\n' +
    '\n' +
    '  <ion-header-bar align-title="left" class="bar bar-header has-tabs-top" style="top: 0 !important;background: #fafafc !important;">\n' +
    '    <button style="display: block; transition-duration: 0ms;" ng-click="$ionicGoBack()" class="button back-button hide buttons  button-clear header-item">\n' +
    '      <i class="icon ion-ios-arrow-back"></i>\n' +
    '      <span class="back-text" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);"></span>\n' +
    '    </button>\n' +
    '    <div class="title title-left header-item" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);">Post</div>\n' +
    '  </ion-header-bar>\n' +
    '\n' +
    '    <ion-content class="has-header" style="top: 0;" padding="false">\n' +
    '      <div class="list card" style="box-shadow: none;margin-left:0;margin-right:0;" ng-show="loading == true">\n' +
    '        <div class="item item-image">\n' +
    '          <!-- <ion-spinner icon="spiral"></ion-spinner> -->\n' +
    '          <img src="img/grayBackground.jpg" style="height: 500px;left: 0; position: absolute">\n' +
    '        </div>\n' +
    '      </div>\n' +
    '      <div class="list card post" style="box-shadow: none;margin-left:0;margin-right:0;">\n' +
    '        <div class="item item-image" style="max-height: 500px;background-color: gray !important;height: 500px;">\n' +
    '            <img ng-src="{{post.photo}}">\n' +
    '          </div>\n' +
    '        <div class="item item-avatar" style="border: none; padding-bottom: 0px;">\n' +
    '          <img ng-src="{{post.avatar}}" style="background-color: transparent" fallback-src="img/profile-picture.png" ui-sref="friend({contact:post.createdBy})">\n' +
    '          <div class="button button-dark button-clear icon ion-android-more-vertical" style="display: block;right: 0;position: fixed;margin-top: -11px" ng-click="showPopup()"></div>\n' +
    '          <h2 class = "lead" style="font-weight: 400 !important;" ui-sref="friend({contact:post.createdBy})">{{post.owner}}</h2>\n' +
    '          <p style="color:black !important;letter-spacing: 1.5px;font-size: 12px;" class="font-thin">{{post.description}}</p>\n' +
    '          <p style="color:black !important;letter-spacing: 1.5px;font-size: 12px;" class="font-thin">{{post.location}}</p>\n' +
    '          <p style="color:black !important; letter-spacing: 1.5px;font-size: 12px" class="font-thin">{{post.postType}}</p>\n' +
    '          <p style="color:black !important; letter-spacing: 1.5px;font-size: 12px;" am-time-ago="{{post.created}}" class="font-thin"></p>\n' +
    '        </div>\n' +
    '        <a class="item" ng-if = "post.postType === \'Event\'" style = "display: inline-flex;font-size:14px;border: none;letter-spacing: 1px;color: black;" ng-click="toggleCommit(post.key,profile.userId)">\n' +
    '          {{commitsLength}} Commits\n' +
    '        </a>\n' +
    '        <a class="item" ng-click="toggleLike(posts.key, profile.userId)" style = "display: inline-flex;font-size: 14px;border: none;color: black;letter-spacing: 1px;">\n' +
    '          {{likesLength}} Likes\n' +
    '        </a>\n' +
    '        <a class="item" style = "display: inline-flex;font-size: 14px; border: none;letter-spacing: 1px;color: black;" ui-sref="comments({post: postId, type: \'Comment\' })">\n' +
    '          {{commmentsNumber}} Comments\n' +
    '        </a>\n' +
    '      </div>\n' +
    '\n' +
    '      <div class="item comments" style="margin-bottom: 21vh;border-top: 1px solid rgba(128, 128, 128, 0.43);margin-top: -18px;border-bottom: none;">\n' +
    '          <div class="item item-avatar" ng-repeat="comment in comments" ng-if="comment.comment" style="border: none;font-weight: 300;">\n' +
    '              <img ng-src="{{comment.userPhoto}}" fallback-src="img/profile-picture.png"/>\n' +
    '              <h2 class = "lead" style="font-weight: 400 !important;">{{comment.userName}}</h2>\n' +
    '              <p class="text-smaller" style = "font-size: 14px !important;">{{comment.comment}}</p>\n' +
    '              <p class="text-smaller" am-time-ago="{{comment.created}}"></p>\n' +
    '          </div>\n' +
    '          <p ng-if="commmentsNumber > 5" class="text-smaller" style="margin-left: 20px;"><a ui-sref="comments({post: postId })" style="color:black">View more</a></p>\n' +
    '          <p ng-if="commmentsNumber == 0" ui-sref="comments({post: postId })" >No comments. be the first to <a ui-sref="comments({post: postId })">leave a comment</a></p>\n' +
    '      </div>\n' +
    '    </ion-content>\n' +
    '    <ion-footer-bar class="bar-light item-input-inset" style="border-top:1px solid #ccc;" ng-form="chatForm" novalidate>\n' +
    '        <label class="item-input-wrapper no-bg">\n' +
    '        <textarea id="textChat" ng-model="formData.comment" placeholder="Comment" required minlength="1" maxlength="1500" style="width:100%;resize: none;" msd-elastic></textarea>\n' +
    '    </label>\n' +
    '      <button class="button button-clear button-icon ion-android-send" ng-click="createComment(formData.comment)"></button>\n' +
    '    </button>\n' +
    '    </ion-footer-bar>\n' +
    '</ion-view>\n'
  );


  $templateCache.put('app/news/regular.html',
    '<ion-view hide-nav-bar="true" class="bg-lightgrey" cache-view = "false">\n' +
    '\n' +
    '    <ion-header-bar style="background-color: #fafafc;height: 48px;top: 0px !important;position: absolute;">\n' +
    '        <div class="row text-center">\n' +
    '            <div class="col font-thin text-large dark" ng-click="$ionicGoBack()" style="color:gray;">Cancel</div>\n' +
    '            <div class="col font-thin text-large balanced bl-grey profile" style="color:green;" ng-if="!post.created" ng-click="createPost()">Send</div>\n' +
    '            <div class="col font-thin text-large balanced bl-grey profile" style="color:green;" ng-if="post.created" ng-click="updatePost()">Send</div>\n' +
    '        </div>\n' +
    '    </ion-header-bar>\n' +
    '\n' +
    '  <ion-content class="has-header" style="top: 44px !important;">\n' +
    '    <div class="event-form" style="height: 283px">\n' +
    '      <div class="list edit padding-horizontal padding-vertical" style="padding:0;height: 283px">\n' +
    '        <div style="height: 283px" ng-if = "view.type === 1">\n' +
    '          <label class="item item-input event__input" ng-click="uploadEventPhoto()" ng-if = "view.type === 1">\n' +
    '            <div class="card image" style="background:transparent !important; box-shadow:none;margin: 0">\n' +
    '                  <div class="item item-image" ng-if = "view.type === 1">\n' +
    '                    <img class="plan_picture" ng-src = "img/post-photo.jpg" name = "photo" ng-model="photo">\n' +
    '                  </div>\n' +
    '              </div>\n' +
    '              <a class="btn-floating btn-small waves-effect waves-light lighten-1" ng-if = "view.type === 1" style="top: -113px;z-index: 5;left: 5px;background-color: white;width:42px;height:42px;line-height: 42px;" ng-click="uploadEventPhoto()">\n' +
    '                <i class="icon ion-ios-camera" style="color: black;display: inherit;font-size: 24px;margin:auto;position: inherit;margin-top: 3%;margin-left: -1%"></i>\n' +
    '              </a>\n' +
    '          </label>\n' +
    '        </div>\n' +
    '\n' +
    '        <div class="list card" style="box-shadow: none;margin-left:0;margin-right:0;padding: 0;margin: 0;" ng-click="uploadEventPhoto()" ng-if="view.type === 2">\n' +
    '          <div class="item item-image" style="max-height: 500px;box-shadow: none;margin-left:0;margin-right:0;padding: 0;margin: 0;" ng-click="uploadEventPhoto()">\n' +
    '              <img ng-src="{{photo}}" name = "photo" ng-model="photo">\n' +
    '            </div>\n' +
    '        </div>\n' +
    '\n' +
    '          <label class="item item-input event__input" style="margin-bottom:15px;padding-top: 20px;">\n' +
    '            <input type="text" name="description" placeholder="" style="margin-left:5px;font-weight:300">{{post.description}}\n' +
    '            <span class="input-label" style="margin-left:5px">Description</span>\n' +
    '          </label>\n' +
    '\n' +
    '          <label class="item item-input event__input" style="margin-bottom: 15px">\n' +
    '            <input type="text" name="location" placeholder="" style="margin-left:5px;font-weight:300">{{post.location}}\n' +
    '            <span class="input-label" style="margin-left:5px">Location</span>\n' +
    '          </label>\n' +
    '\n' +
    '        </div>\n' +
    '    </div>\n' +
    '  </ion-content>\n' +
    '\n' +
    '</ion-view>\n'
  );


  $templateCache.put('app/settings/communicate.html',
    '<ion-view title="Notifications" scroll="true" hide-nav-bar="true">\n' +
    '  <ion-nav-bar>\n' +
    '    <ion-nav-back-button style="display: block">\n' +
    '    </ion-nav-back-button>\n' +
    '  </ion-nav-bar>\n' +
    '\n' +
    '  <ion-header-bar align-title="left" class="bar bar-header has-tabs-top" style="top: 0 !important;">\n' +
    '    <button style="display: block; transition-duration: 0ms;" ng-click="$ionicGoBack()" class="button back-button hide buttons  button-clear header-item">\n' +
    '      <i class="icon ion-ios-arrow-back"></i>\n' +
    '      <span class="back-text" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);"></span>\n' +
    '    </button>\n' +
    '    <div class="title title-left header-item" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);">Notifications</div>\n' +
    '  </ion-header-bar>\n' +
    '\n' +
    '\n' +
    '    <ion-content class="has-header bt-grey profile">\n' +
    '\n' +
    '      <div class="list">\n' +
    '          <div class="item item-avatar item-text-wrap" style="border-color: #fafafc;" ng-repeat = "plan in userPostsLikes.itemsArr | limitTo: limit">\n' +
    '              <img ng-src="{{plan.userPhoto}}">\n' +
    '              <h2 class="lead">{{plan.userName}}</h2>\n' +
    '              <p>Liked your plan</p>\n' +
    '              <p class="text-smaller" am-time-ago="{{plan.date}}"></p>\n' +
    '          </div>\n' +
    '      </div>\n' +
    '\n' +
    '          <div class="list">\n' +
    '              <div class="item item-avatar item-text-wrap" style="border-color: #fafafc;" ng-repeat = "commits in userPlanCommits.itemsArr | limitTo: limit">\n' +
    '                  <img ng-src="{{commits.userPhoto}}">\n' +
    '                  <h2 class="lead">{{commits.userName}}</h2>\n' +
    '                  <p>Commited to your plan</p>\n' +
    '                  <p class="text-smaller" am-time-ago="{{commits.date}}"></p>\n' +
    '              </div>\n' +
    '          </div>\n' +
    '\n' +
    '          <div class="list">\n' +
    '              <div class="item item-avatar item-text-wrap" style="border-color: #fafafc;" ng-repeat = "commits in userPostCommits.itemsArr | limitTo: limit">\n' +
    '                  <img ng-src="{{commits.userPhoto}}">\n' +
    '                  <h2 class="lead">{{commits.userName}}</h2>\n' +
    '                  <p>Commited to your post</p>\n' +
    '                  <p class="text-smaller" am-time-ago="{{commits.date}}"></p>\n' +
    '              </div>\n' +
    '          </div>\n' +
    '\n' +
    '          <div class="list">\n' +
    '              <div class="item item-avatar item-text-wrap" style="border-color: #fafafc;" ng-repeat = "appointment in userAppointmentCommits.itemsArr | limitTo: limit">\n' +
    '                  <img ng-src="{{appointment.userPhoto}}">\n' +
    '                  <h2 class="lead">{{appointment.userName}}</h2>\n' +
    '                  <p>Commited to your appointment</p>\n' +
    '                  <p class="text-smaller" am-time-ago="{{appointment.date}}"></p>\n' +
    '              </div>\n' +
    '          </div>\n' +
    '          <ion-infinite-scroll on-infinite="loadMore() && loadMorePostCommits() && loadMoreCommits()" ng-if="!moreToScroll" distance="1%"></ion-infinite-scroll>\n' +
    '    </ion-content>\n' +
    '</ion-view>\n'
  );


  $templateCache.put('app/settings/settings.html',
    '<ion-view title="Settings" hide-nav-bar="true" cache-view="false">\n' +
    '\n' +
    '  <ion-header-bar align-title="left" class="bar bar-header has-tabs-top" style="top: 0 !important;background: #fafafc !important;">\n' +
    '    <button style="display: block; transition-duration: 0ms;" ng-click="$ionicGoBack()" class="button back-button hide buttons  button-clear header-item">\n' +
    '      <i class="icon ion-ios-arrow-back"></i>\n' +
    '      <span class="back-text" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);"></span>\n' +
    '    </button>\n' +
    '    <div class="title title-left header-item" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);">Settings</div>\n' +
    '  </ion-header-bar>\n' +
    '\n' +
    '    <ion-content class="has-header" style="top: 44px;">\n' +
    '    <div class="list" style="margin-bottom: 10px; border: none">\n' +
    '        <div class="item item-divider" style="background-color: white; color: #F10707;" style="border: none">Profile</div>\n' +
    '        <div class="item" ui-sref="edit-profile" style="border: none">Edit profile</div>\n' +
    '          <div class="item" ng-click="interests()" style="border: none">Update interest</div>\n' +
    '          <div class="item" ng-click = "share()" style="border: none">Share this app</div>\n' +
    '        </div>\n' +
    '\n' +
    '      <div class="list">\n' +
    '           <div class="item item-divider" style="background-color: white; color: #F10707;font-family: limbus;border:none;">Help</div>\n' +
    '            <div class="item" ng-click="policy()" style="border: none">\n' +
    '              Privacy Policy\n' +
    '            </div>\n' +
    '            <div class="item" ng-click="service()" style="border: none">\n' +
    '              Terms of Service\n' +
    '            </div>\n' +
    '            <div class="item" ng-click="support()" style="border: none">\n' +
    '              Support\n' +
    '            </div>\n' +
    '            <div class = "item" ng-click="logout()" style="border: none">Sign Out</div>\n' +
    '      </div>\n' +
    '\n' +
    '    </ion-content>\n' +
    '</ion-view>\n'
  );


  $templateCache.put('app/settings/status.html',
    '<ion-view title="Update Status" class="font-thin">\n' +
    '  <ion-nav-bar>\n' +
    '    <ion-nav-back-button style="display: block">\n' +
    '    </ion-nav-back-button>\n' +
    '\n' +
    '    <ion-header-bar align-title="right" style="background: transparent !important;z-index: 999;" ui-sref="tabs.account">\n' +
    '        <h1 class="title font-thin" style="color: black; font-weight: 400; z-index: 999;" ui-sref="tabs.account">SUBMIT</h1>\n' +
    '    </ion-header-bar>\n' +
    '  </ion-nav-bar>\n' +
    '\n' +
    '  <div class="bg-image" style="background-image:url(\'img/bg-photo.jpg\')">\n' +
    '    <div class="bg-color login-flow">\n' +
    '    <ion-content class="has-header" style="background: transparent !important;">\n' +
    '      <h1 class="font-thin" style="color: white; font-size: 20px; font-weight: 400 !important;margin-left: 20px;margin-top: 24px">Would you like to be considered a leader?</h1>\n' +
    '       <ion-radio ng-model="user.leader" ng-value="\'leader\'" style="background-color: transparent !important;margin-left: 5px;font-weight: 400;border: none">Yes</ion-radio>\n' +
    '       <ion-radio ng-model="user.person" ng-value="\'person\'" style="background-color: transparent !important;margin-left: 6px;font-weight: 400;border: none">No</ion-radio>\n' +
    '    </ion-content>\n' +
    '  </div>\n' +
    '  </div>\n' +
    '</ion-view>\n'
  );


  $templateCache.put('app/shop/connect.html',
    '<ion-view view-title="Connect" class="font-thin" style="background:#fafafc;" hide-nav-bar="true">\n' +
    '    <ion-content scroll="true">\n' +
    '          <div class="row row-no-padding category-2-outer" style="padding:0"ng-repeat = "ab in abs | limitTo: limit track by $index">\n' +
    '            <div class="col">\n' +
    '              <a ui-sref="tabs.contacts({activity:ab.id})">\n' +
    '                <div class="category-2-item-wrapper">\n' +
    '                  <div class="category-2-item-content">\n' +
    '                    <div class = "multi-bg-outer" multi-bg="[bg_img]" interval="3000" helper-class="category-with-image" style="background-image: url({{ab.photo}});">\n' +
    '                      <img bg="" class="multi-bg category-with-image">\n' +
    '                      <span class="bg-overlay"></span>\n' +
    '                      <h1 class="category-heading">\n' +
    '                        <span>0{{ab.numbers}}\n' +
    '                          <span class="bubble"></span>\n' +
    '                        </span>\n' +
    '                        <span style="border-bottom: 1px solid #F10707;">{{ab.label}}</span>\n' +
    '                      </h1>\n' +
    '                    </div>\n' +
    '                  </div>\n' +
    '                </div>\n' +
    '              </a>\n' +
    '            </div>\n' +
    '          </div>\n' +
    '          <ion-infinite-scroll on-infinite="loadMore()" ng-if="!moreToScroll" distance="1%"></ion-infinite-scroll>\n' +
    '    </ion-content>\n' +
    '</ion-view>\n'
  );


  $templateCache.put('app/shop/interest.html',
    '<ion-view class="view-login" style="color: white;" hide-nav-bar="true">\n' +
    '\n' +
    '  <ion-header-bar align-title="left" class="bar signup-bar-clear bar-header has-tabs-top" style="top: 0 !important;box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.2);">\n' +
    '    <button style="display: block; transition-duration: 0ms;" ng-click="$ionicGoBack()" class="button back-button hide buttons  button-clear header-item">\n' +
    '      <i class="icon ion-ios-arrow-back" style="color: gray"></i>\n' +
    '      <span class="back-text" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);"></span>\n' +
    '    </button>\n' +
    '    <div class="title title-left header-item" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);margin-left: 0;">Select your interest</div>\n' +
    '    <div class="button" style="background: transparent;color: gray;font-size: 20px;" ui-sref="partners({partner:profile.userId, mode: \'Regular\'})">Next</div>\n' +
    '  </ion-header-bar>\n' +
    '\n' +
    '  <ion-content class="has-header" scroll="true">\n' +
    '           <div class="row row-no-padding category-2-outer" style="padding:0;overflow:scroll" ng-repeat = "interest in interestImages track by $index">\n' +
    '             <div class="col">\n' +
    '                 <div class="category-2-item-wrapper" style="z-index: 1">\n' +
    '                   <div class="category-2-item-content" style="z-index: 1">\n' +
    '                     <div class = "multi-bg-outer" multi-bg="[bg_img]" interval="3000" helper-class="category-with-image" style="background-image: url({{interest.src}});">\n' +
    '                       <img bg="" ng-src="{{interest.src}}" class="multi-bg category-with-image">\n' +
    '                       <span class="bg-overlay"></span>\n' +
    '                       <ion-checkbox style="color: #F10707;background-color: transparent;border-color: transparent;height:80px;" data-interest-id="{{ interest.id }}" ng-model="isChecked"  ng-change="checkedOrNot(interest, isChecked, $index, $localStorage)" ng-init=\'isChecked=false\'>\n' +
    '                       </ion-checkbox>\n' +
    '                       <h1 class="category-heading" style="width: 80%" >\n' +
    '                         <span>{{$index +1}}\n' +
    '                           <span class="bubble"></span>\n' +
    '                         </span>\n' +
    '                         <span style="border-bottom: 1px solid #F10707;">{{interest.label}}</span>\n' +
    '                       </h1>\n' +
    '                     </div>\n' +
    '                   </div>\n' +
    '                 </div>\n' +
    '             </div>\n' +
    '           </div>\n' +
    '\n' +
    '    </ion-content>\n' +
    '</ion-view>\n'
  );


  $templateCache.put('app/shop/match.html',
    '<ion-view view-title="Connect" class="font-thin" style="background:#fafafc;" hide-nav-bar="true">\n' +
    '  <ion-nav-buttons side="right">\n' +
    '        <button class="button button-dark button-clear icon ion-android-more-vertical" style="margin-right: 10px;z-index: 999;" ui-sref="settings"></button>\n' +
    '    </ion-nav-buttons>\n' +
    '\n' +
    '\n' +
    '    <ion-floating-button ng-if="view.type === 1" ng-click="view.type = 2"class="match-float" has-footer="false" button-color="#F10707" style= "left: 20px;" icon="ion-ios-shuffle-strong" iconColor="#fff">\n' +
    '    </ion-floating-button>\n' +
    '\n' +
    '    <ion-floating-button ng-if="view.type === 2" ng-click="view.type = 1"class="match-float" has-footer="false" button-color="#F10707" style= "left: 20px;" icon="ion-ios-shuffle-strong" iconColor="#fff">\n' +
    '    </ion-floating-button>\n' +
    '    <ion-content  class="has-tabs-top">\n' +
    '      <div ng-if="view.type === 1" style="top: 37px;position: relative;font-size: 18px;margin-left: 20px;">Connect</div>\n' +
    '        <div ng-if="view.type === 1" on-swipe-left="onSwipeLeft1()" on-swipe-right="onSwipeRight2()" style="position: relative;top:53px;">\n' +
    '          <div class="row row-no-padding category-2-outer" style="padding:0;" ng-repeat = "ab in connectImages track by $index" style="-webkit-transform: translateZ(0);-webkit-backface-visibility: hidden;">\n' +
    '            <div class="col">\n' +
    '              <a ui-sref="contacts({activity:ab.id, type: \'Connect\'})">\n' +
    '                <div class="category-2-item-wrapper">\n' +
    '                  <div class="category-2-item-content">\n' +
    '                    <div class = "multi-bg-outer" multi-bg="[bg_img]" interval="3000" helper-class="category-with-image" style="background-image: url({{ab.src}});-webkit-transform: translateZ(0);-webkit-backface-visibility: hidden;">\n' +
    '                      <img bg="" ng-src ="{{ab.src}}" class="multi-bg category-with-image">\n' +
    '                      <span class="bg-overlay"></span>\n' +
    '                      <h1 class="category-heading" style="width: 80%">\n' +
    '                        <span>{{$index +1}}\n' +
    '                          <span class="bubble"></span>\n' +
    '                        </span>\n' +
    '                        <span style="border-bottom: 1px solid #F10707;">{{ab.label}}</span>\n' +
    '                      </h1>\n' +
    '                    </div>\n' +
    '                  </div>\n' +
    '                </div>\n' +
    '              </a>\n' +
    '            </div>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '\n' +
    '      <div ng-if="view.type === 2" style="top: 37px;position: relative;font-size: 18px;margin-left: 20px;">Leaders</div>\n' +
    '      <div ng-if="view.type === 2" on-swipe-left="onSwipeLeft2()" on-swipe-right="onSwipeRight1()" style="position: relative;top:53px;">\n' +
    '        <div class="row row-no-padding category-2-outer" style="padding:0" ng-repeat = "trainer in leaderImages track by $index" style="-webkit-transform: translateZ(0);-webkit-backface-visibility: hidden;">\n' +
    '          <div class="col">\n' +
    '            <a ui-sref="contactLeader({activity:trainer.id, type: \'Leaders\'})">\n' +
    '              <div class="category-2-item-wrapper">\n' +
    '                <div class="category-2-item-content">\n' +
    '                  <div class = "multi-bg-outer" multi-bg="[bg_img]" interval="3000" helper-class="category-with-image" style="background-image: url({{trainer.src}});-webkit-transform: translateZ(0);-webkit-backface-visibility: hidden;">\n' +
    '                    <img bg="" ng-src = "{{trainer.src}}" class="multi-bg category-with-image">\n' +
    '                    <span class="bg-overlay"></span>\n' +
    '                    <h1 class="category-heading" style="width: 80%">\n' +
    '                      <span>{{$index +1}}\n' +
    '                        <span class="bubble"></span>\n' +
    '                      </span>\n' +
    '                      <span style="border-bottom: 1px solid #F10707;">{{trainer.label}}</span>\n' +
    '                    </h1>\n' +
    '                  </div>\n' +
    '                </div>\n' +
    '              </div>\n' +
    '            </a>\n' +
    '          </div>\n' +
    '        </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>\n'
  );


  $templateCache.put('app/shop/roleRather.html',
    '<ion-view class="view-login" style="color: white;" hide-nav-bar="true">\n' +
    '\n' +
    '  <ion-header-bar align-title="left" class="bar signup-bar-clear bar-header has-tabs-top" style="top: 0 !important;box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.2);">\n' +
    '    <button style="display: block; transition-duration: 0ms;" ng-click="$ionicGoBack()" class="button back-button hide buttons  button-clear header-item">\n' +
    '      <i class="icon ion-ios-arrow-back" style="color: gray"></i>\n' +
    '      <span class="back-text" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);"></span>\n' +
    '    </button>\n' +
    '    <div class="title title-left header-item" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);margin-left: 0;">Select your interest</div>\n' +
    '    <div class="button" style="background: transparent;color: gray;font-size: 20px;" ui-sref="partners({partner:profile.userId, mode: \'Regular\'})">Next</div>\n' +
    '  </ion-header-bar>\n' +
    '\n' +
    '  <ion-content class="has-header" scroll="true">\n' +
    '           <div class="row row-no-padding category-2-outer" style="padding:0;overflow:scroll" ng-repeat = "interest in ratherImages track by $index">\n' +
    '             <div class="col">\n' +
    '                 <div class="category-2-item-wrapper" style="z-index: 1">\n' +
    '                   <div class="category-2-item-content" style="z-index: 1">\n' +
    '                     <div class = "multi-bg-outer" multi-bg="[bg_img]" interval="3000" helper-class="category-with-image" style="background-image: url({{interest.src}});">\n' +
    '                       <img bg=""  ng-src = "{{interest.src}}" class="multi-bg category-with-image">\n' +
    '                       <span class="bg-overlay"></span>\n' +
    '                       <ion-checkbox style="color: #F10707;background-color: transparent;border-color: transparent;height:80px;" data-interest-id="{{ interest.id }}" ng-model="isChecked"  ng-change="checkedOrNot(interest, isChecked, $index, $localStorage)" ng-init=\'isChecked=false\'>\n' +
    '                       </ion-checkbox>\n' +
    '                       <h1 class="category-heading" style="width: 80%" >\n' +
    '                         <span>{{$index +1}}\n' +
    '                           <span class="bubble"></span>\n' +
    '                         </span>\n' +
    '                         <span style="border-bottom: 1px solid #F10707;">{{interest.label}}</span>\n' +
    '                       </h1>\n' +
    '                     </div>\n' +
    '                   </div>\n' +
    '                 </div>\n' +
    '             </div>\n' +
    '           </div>\n' +
    '    </ion-content>\n' +
    '</ion-view>\n'
  );

}]);
