const fetch = require('isomorphic-fetch');
const utils = require('../utils');
const logger = utils.getLogger('[Client/homeserver] ');
const config = utils.config;

const baseOptions = {
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    }
};


class RestApiClient {

    constructor(base_url = '') {
        this.base_url = base_url
    }

    _build_url(api_url) {
        return `${this.base_url}/_matrix/client/r0${api_url}`
    }

    createRoomAndInvite(userId, targetUserId, token) {
        const payload = {"preset":"trusted_private_chat"
            ,"visibility":"private"
            ,"invite":[targetUserId]
            ,"is_direct":true
            ,"initial_state":[{"content":{"guest_access":"can_join"},"type":"m.room.guest_access","state_key":""}]};
        const options = Object.assign({}, baseOptions, {method: 'POST', body: JSON.stringify(payload)});

        logger.debug(`createRoomAndInvite: ${userId}  ${targetUserId}  ${token}`);
        logger.debug('createRoomAndInvite:' + JSON.stringify(payload));
        return fetch(this._build_url('/createRoom', userId) + `?access_token=${token}`, options)
    }

    joinRoom(userId, roomId, token) {
        const payload = {};
        const options = Object.assign({}, baseOptions, {method: 'POST', body: JSON.stringify(payload)});
        return fetch(this._build_url(`/join/${roomId}`, userId) + `?access_token=${token}`, options)
    }

    // 拒绝好友邀请
    leaveRoom(userId, roomId, token) {
        const payload = {};
        const options = Object.assign({}, baseOptions, {method: 'POST', body: JSON.stringify(payload)});
        return fetch(this._build_url(`/rooms/${roomId}/leave`, userId) + `?access_token=${token}`, options)
    }

    login(userId, password) {
        const payload = {
            user: userId,
            password: password,
            type: 'm.login.password'
        };
        const options = Object.assign({}, baseOptions, {method: 'POST', body: JSON.stringify(payload)});
        return fetch(this._build_url(`/login`, userId), options)
    }

    addTag(userId, roomId, key, value = {}, token) {
        const payload = value;
        const options = Object.assign({}, baseOptions, {method: 'PUT', body: JSON.stringify(payload)});
        return fetch(this._build_url(`/user/${userId}/rooms/${roomId}/tags/${key}`, userId) + `?access_token=${token}`, options)
    }

    inviteUser(userId, targetUserId, roomId, token) {
        const payload = { user_id: targetUserId };
        const options = Object.assign({}, baseOptions, {method: 'POST', body: JSON.stringify(payload)});
        return fetch(this._build_url(`/rooms/${roomId}/invite`, userId) + `?access_token=${token}`, options)
    }

    getRoomTags(userId, roomId, token) {
        const options = Object.assign({}, baseOptions, {method: 'GET'});
        return fetch(this._build_url(`/user/${userId}/rooms/${roomId}/tags`, userId) + `?access_token=${token}`, options)
    }

    async setDisplayName(userId, displayName, token) {
        const payload = {
            displayname: displayName
        };
        const options = Object.assign({}, baseOptions, {method: 'PUT', body: JSON.stringify(payload)});
        return fetch(this._build_url(`/profile/${userId}/displayname?access_token=${token}`, userId), options)
    }

    async getAvatarUrlAsync(userId) {
        const options = Object.assign({}, baseOptions, {method: 'GET'});

        try {
            const resp = await fetch(this._build_url(`/profile/${userId}/avatar_url`, userId), options);
            if (resp.status === 200) {
                const resp_body = await resp.json();
                return resp_body.avatar_url ? resp_body.avatar_url : ''
            }
        } catch (err) {
            logger.error('getAvatarUrl请求异常: ' + err.message);
            return ''
        }
    }

    async checkToken(userId, token) {
        // 通过获取room tags是否成功来判断
        try {
            const res = await this.getRoomTags(userId, 'null', token);
            return (res.status === 200);
        } catch (err) {
            logger.error('checkToken请求异常: ' + err.message)
        }
        return false;
    };

    _getDomainFromUserId(userId) {
        return userId.split(':')[1]
    }

}

module.exports = RestApiClient;
