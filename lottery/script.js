// appId 를 변경해서 사용해야 합니다.
window.fbAsyncInit = function () {
    FB.init({
        appId: '2073551532880414',
        cookie: true,
        xfbml: true,
        version: 'v2.8'
    });
    FB.AppEvents.logPageView();
    FB.getLoginStatus(function (response) {
        if (response.status !== 'connected') {
            document.getElementById('require_login').style.display = 'block';
        }
    });

};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkLoginState() {
    FB.getLoginStatus(function (response) {

    });
}

commentList = [];

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}


function fetchComments(next, callback) {
    debugger;
    if (next === undefined) {
        shuffle(commentList);
        var code = commentList.map(function (data, i) {
            return "<tr><td>" + (i + 1) + "</td><td><a href=\"https://facebook.com/" + data.id + "\" target=\"_blank\">" + data.name + "</a></td><td>" + data.message + "</td></tr>";
        });
        document.getElementById('result-comments').innerHTML = '<table class="ui very basic collapsing celled table"><tbody>' + code.join('') + '</tbody></table>';
        callback(null, commentList);
        document.getElementById('result-comment-count').innerHTML = commentList.length;
        return;
    }
    FB.api(
        next,
        function (response) {
            if (response && !response.error) {
                for (var name in response.data) {
                    var _comment = response.data[name];
                    if (!_comment.from) {
                        continue;
                    }
                    var comment = {};
                    comment.type = 'comment';
                    comment.id = _comment.from.id;
                    comment.name = _comment.from.name;
                    comment.message = _comment.message;
                    var isExist = commentList.find(function (data) {
                        return data.id === comment.id
                    })
                    if (!isExist) {
                        commentList.push(comment);
                        document.getElementById('result-comment-count').innerHTML = commentList.length;
                    }
                }
                fetchComments(response.paging.next, callback);
            } else {
                var msg = response.error.message;
                switch (response.error.code) {
                    case 100:
                        msg = '입력값이 올바른지 확인해주세요.\n' + msg;
                        break;
                    case 104:
                        msg = '페이스북 로그인을 먼저 해주세요.\n' + msg;
                }
                alert('깜짝이야! 에러가 발생했습니다! \n' + msg);
            }
        }
    );
}

function fetchSharedposts(next, callback) {
    if (next === undefined) {
        shuffle(sharedpostList);
        var code = sharedpostList.map(function (data, i) {
            return "<tr><td>" + (i + 1) + "</td><td><a href=\"https://facebook.com/" + data.id + "\" target=\"_blank\">" + data.name + "</a></td></tr>";
        });
        document.getElementById('result-sharedposts').innerHTML = '<table class="ui very basic collapsing celled table"><tbody>' + code.join('') + '</tbody></table>';
        callback(null, sharedpostList);
        document.getElementById('result-sharedpost-count').innerHTML = sharedpostList.length;
        return;
    }
    FB.api(
        next,
        function (response) {
            if (response && !response.error) {
                for (var name in response.data) {
                    var _sharedpost = response.data[name];
                    var sharedpost = {};
                    sharedpost.type = 'sharedpost';
                    sharedpost.id = _sharedpost.from.id;
                    sharedpost.name = _sharedpost.from.name;
                    sharedpost.message = _sharedpost.message;
                    var isExist = sharedpostList.find(function (data) {
                        return data.id === sharedpost.id
                    })
                    if (!isExist) {
                        sharedpostList.push(sharedpost);
                        document.getElementById('result-sharedpost-count').innerHTML = sharedpostList.length;
                    }
                }
                var next = response.paging ? response.paging.next : undefined;
                fetchSharedposts(next, callback);
            } else {
                var msg = response.error.message;
                switch (response.error.code) {
                    case 100:
                        msg = '입력값이 올바른지 확인해주세요.\n' + msg;
                        break;
                    case 104:
                        msg = '페이스북 로그인을 먼저 해주세요.\n' + msg;
                }
                alert('깜짝이야! 에러가 발생했습니다! \n' + msg);
            }
        }
    );
}

function fetchLikes(next, callback) {
    if (next === undefined) {
        shuffle(likeList);
        var code = likeList.map(function (data, i) {
            return "<tr><td >" + (i + 1) + "</td><td class=\"reactions\"><img src=\"" + data.pic + "\"><a href=\"" + data.link + "\" target=\"_blank\">" + data.name + "(" + data.type + ")" + "</a></td></tr>";
        });
        document.getElementById('result-likes').innerHTML = '<table class="ui very basic collapsing celled table"><tbody>' + code.join('') + '</tbody></table>';
        document.getElementById('result-like-count').innerHTML = likeList.length;
        callback(null, likeList);
        return;
    }
    FB.api(
        next,
        function (response) {
            if (response && !response.error) {
                for (var name in response.data) {
                    var item = response.data[name];
                    item.type = 'like';
                    likeList.push(item);
                    document.getElementById('result-like-count').innerHTML = likeList.length;
                }
                // fetchComments(undefined);
                fetchLikes(response.paging.next, callback);
            } else {
                var msg = response.error.message;
                switch (response.error.code) {
                    case 100:
                        msg = '입력값이 올바른지 확인해주세요.\n' + msg;
                        break;
                    case 104:
                        msg = '페이스북 로그인을 먼저 해주세요.\n' + msg;
                }
                alert('깜짝이야! 에러가 발생했습니다! \n' + msg);
            }
        }
    );
}

function parseURL(url) {
    var parser = document.createElement('a'),
        searchObject = {},
        queries, split, i;
    // Let the browser do the work
    parser.href = url;
    // Convert query string to object
    queries = parser.search.replace(/^\?/, '').split('&');
    for (i = 0; i < queries.length; i++) {
        split = queries[i].split('=');
        searchObject[split[0]] = split[1];
    }
    return {
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        search: parser.search,
        searchObject: searchObject,
        hash: parser.hash
    };
}

function getCall(callback) {
    var parser = parseURL($('#src').val().trim());
    if (parser.host.indexOf('facebook.com') !== -1) {
        var matchs = parser.pathname.match(/\/groups\/(.+?)\/permalink\/([0-9]+)/);
        if (!matchs) {
            var matchs = $('#src').val().trim().match(/facebook\.com\/([0-9]+)\/(photos|videos)\/.+?\/([0-9]+)\//);
            if (!matchs) {
                var matchs = $('#src').val().trim().match(/facebook\.com\/([0-9]+)\/videos\/([0-9]+)\//);
                if (matchs) {
                    callback({
                        'comments': matchs[1] + '_' + matchs[2] + '/comments?limit=100',
                        'likes': matchs[1] + '_' + matchs[2] + '/reactions?fields=pic,link,name,type&limit=100',
                        'sharedposts': matchs[1] + '_' + matchs[2] + '/sharedposts?limit=100',
                    });
                }
            }
        }
        if (matchs) {
            var groupId = matchs[1];
            var pageId = matchs[2];
            if (!/[0-9]+/.test(matchs[1])) {
                FB.api('search?type=group&q=' + matchs[1], function (group) {
                    callback({
                        'comments': pageId + '/comments',
                        'likes': group.data[0].id + '_' + pageId + '/reactions?fields=pic,link,name,type',
                        'sharedposts': pageId + '/sharedposts?fields=from'
                    });
                });
            }
        } else if (parser.searchObject.story_fbid) {
            callback({
                'comments': parser.searchObject.id + '_' + parser.searchObject.story_fbid + '/comments?limit=100',
                'likes': parser.searchObject.id + '_' + parser.searchObject.story_fbid + '/reactions?fields=pic,link,name,type&limit=100',
                'sharedposts': parser.searchObject.id + '_' + parser.searchObject.story_fbid + '/sharedposts?limit=100',
            });
        }
    }
}

function resetResult() {
    document.getElementById('result-comment-count').innerHTML = 0;
    document.getElementById('result-like-count').innerHTML = 0;
//            document.getElementById('result-sharedpost-count').innerHTML = 0;
    document.getElementById('result-sum-count').innerHTML = 0;
}

function lottery() {
    $('#result_wrap').show();
    resetResult();
    commentList = [];
    likeList = [];
    sharedpostList = [];
    getCall(function (calls) {
        if (calls) {
            $('#result').innerHTML = '';
            async.parallel([
                function (callback) {
                    fetchComments(calls.comments, callback);
                },
                function (callback) {
                    fetchLikes(calls.likes, callback);
                },
                function (callback) {
                    callback(null, []);
//                        fetchSharedposts(calls.sharedposts, callback);
                }
            ], function (err, results) {
                var merged = results[0].concat(results[1], results[2]);
                shuffle(merged);
                var code = merged.map(function (data, i) {
                    return "<tr class=\"" + data.type + "\"><td>" + (i + 1) + "</td><td><a href=\"https://facebook.com/" + data.id + "\" target=\"_blank\">" + data.name + "</a></td><td>" + data.type + "</td></tr>";
                });
                document.getElementById('result-sum').innerHTML = '<table class="ui very basic collapsing celled table"><tbody>' + code.join('') + '</tbody></table>';
                document.getElementById('result-sum-count').innerHTML = merged.length;

            });


        }
    });

}