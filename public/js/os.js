// Web OS System Information Module
class WebOS {
    constructor() {
        this.systemInfo = {
            platform: 'Web OS',
            version: '1.0.0',
            architecture: 'x64',
            hostname: 'WebOS-Desktop',
            userInfo: {
                username: 'User',
                homeDir: '/home/user'
            },
            memory: {
                total: 8192, // 8GB
                free: 6144,  // 6GB
                used: 2048   // 2GB
            },
            cpu: {
                model: 'Web CPU',
                cores: 4,
                speed: '2.4 GHz'
            },
            network: {
                interfaces: [
                    {
                        name: 'Wi-Fi',
                        address: '192.168.1.100',
                        status: 'connected'
                    }
                ]
            },
            uptime: 0
        };
        
        this.startTime = Date.now();
        this.updateUptime();
    }

    // 시스템 정보 가져오기
    getSystemInfo() {
        return this.systemInfo;
    }

    // 플랫폼 정보
    platform() {
        return this.systemInfo.platform;
    }

    // OS 버전
    version() {
        return this.systemInfo.version;
    }

    // 아키텍처
    arch() {
        return this.systemInfo.architecture;
    }

    // 호스트명
    hostname() {
        return this.systemInfo.hostname;
    }

    // 사용자 정보
    userInfo() {
        return this.systemInfo.userInfo;
    }

    // 메모리 정보
    memory() {
        return this.systemInfo.memory;
    }

    // CPU 정보
    cpu() {
        return this.systemInfo.cpu;
    }

    // 네트워크 인터페이스
    networkInterfaces() {
        return this.systemInfo.network;
    }

    // 업타임 업데이트
    updateUptime() {
        setInterval(() => {
            this.systemInfo.uptime = Math.floor((Date.now() - this.startTime) / 1000);
        }, 1000);
    }

    // 업타임 가져오기
    uptime() {
        return this.systemInfo.uptime;
    }

    // 메모리 사용률 계산
    getMemoryUsage() {
        const mem = this.systemInfo.memory;
        return {
            total: mem.total,
            free: mem.free,
            used: mem.used,
            percentage: Math.round((mem.used / mem.total) * 100)
        };
    }

    // 시스템 상태 요약
    getSystemStatus() {
        return {
            platform: this.platform(),
            version: this.version(),
            uptime: this.formatUptime(this.uptime()),
            memory: this.getMemoryUsage(),
            cpu: this.cpu(),
            network: this.networkInterfaces()
        };
    }

    // 업타임 포맷팅
    formatUptime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // 시스템 정보를 JSON으로 반환
    toJSON() {
        return this.getSystemStatus();
    }
}

// 전역 객체로 내보내기
window.WebOS = WebOS; 