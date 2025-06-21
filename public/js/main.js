// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    const contextMenu = document.getElementById('contextMenu');
    let currentTarget = null;

    // WebOS 인스턴스 생성
    const webOS = new WebOS();

    // 좌클릭 이벤트 처리
    document.addEventListener('click', function(e) {
        const target = e.target.closest('.taskbar-icon, .start-btn');
        
        if (target) {
            const app = target.getAttribute('data-app');
            handleLeftClick(app, target);
        }
        
        // 컨텍스트 메뉴 외부 클릭 시 닫기
        if (!contextMenu.contains(e.target)) {
            hideContextMenu();
        }
    });

    // 우클릭 이벤트 처리
    document.addEventListener('contextmenu', function(e) {
        const target = e.target.closest('.taskbar-icon, .start-btn');
        
        if (target) {
            e.preventDefault();
            currentTarget = target;
            const app = target.getAttribute('data-app');
            showContextMenu(e.clientX, e.clientY, app);
        } else {
            hideContextMenu();
        }
    });

    // 컨텍스트 메뉴 아이템 클릭 처리
    contextMenu.addEventListener('click', function(e) {
        const menuItem = e.target.closest('.context-menu-item');
        if (menuItem && currentTarget) {
            const action = menuItem.getAttribute('data-action');
            const app = currentTarget.getAttribute('data-app');
            handleContextMenuAction(action, app, currentTarget);
            hideContextMenu();
        }
    });

    // ESC 키로 컨텍스트 메뉴 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideContextMenu();
        }
    });

    // 좌클릭 처리 함수
    function handleLeftClick(app, target) {
        console.log(`좌클릭: ${app} 앱 실행`);
        
        // 활성화 상태 토글
        if (target.classList.contains('taskbar-icon')) {
            document.querySelectorAll('.taskbar-icon').forEach(icon => {
                icon.classList.remove('active');
            });
            target.classList.add('active');
        }

        // 앱별 실행 로직
        switch(app) {
            case 'start':
                showSystemInfo();
                break;
            case 'explorer':
                alert('파일 탐색기가 실행됩니다!');
                break;
            case 'edge':
                alert('Microsoft Edge가 실행됩니다!');
                break;
            case 'store':
                alert('Microsoft Store가 실행됩니다!');
                break;
        }
    }

    // 시스템 정보 표시 함수
    function showSystemInfo() {
        const systemStatus = webOS.getSystemStatus();
        const memoryUsage = webOS.getMemoryUsage();
        
        const info = `
🌐 플랫폼: ${systemStatus.platform}
📋 버전: ${systemStatus.version}
⏰ 업타임: ${systemStatus.uptime}
💾 메모리: ${memoryUsage.used}MB / ${memoryUsage.total}MB (${memoryUsage.percentage}%)
🖥️ CPU: ${systemStatus.cpu.model} (${systemStatus.cpu.cores}코어)
🌍 네트워크: ${systemStatus.network.interfaces[0].name} - ${systemStatus.network.interfaces[0].address}
        `;
        
        alert('시스템 정보\n' + info);
    }

    // 컨텍스트 메뉴 표시
    function showContextMenu(x, y, app) {
        contextMenu.style.display = 'block';
        
        // 화면 경계 체크
        const rect = contextMenu.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        if (x + rect.width > windowWidth) {
            x = windowWidth - rect.width - 10;
        }
        
        if (y + rect.height > windowHeight) {
            y = windowHeight - rect.height - 10;
        }
        
        contextMenu.style.left = x + 'px';
        contextMenu.style.top = y + 'px';
    }

    // 컨텍스트 메뉴 숨기기
    function hideContextMenu() {
        contextMenu.style.display = 'none';
        currentTarget = null;
    }

    // 컨텍스트 메뉴 액션 처리
    function handleContextMenuAction(action, app, target) {
        console.log(`컨텍스트 메뉴: ${action} - ${app}`);
        
        switch(action) {
            case 'open':
                handleLeftClick(app, target);
                break;
            case 'pin':
                alert(`${app}이(가) 작업 표시줄에 고정되었습니다!`);
                break;
            case 'unpin':
                alert(`${app}이(가) 작업 표시줄에서 고정 해제되었습니다!`);
                break;
            case 'properties':
                showAppProperties(app);
                break;
        }
    }

    // 앱 속성 표시
    function showAppProperties(app) {
        const systemInfo = webOS.getSystemInfo();
        const properties = `
📱 앱 이름: ${app}
🏠 플랫폼: ${systemInfo.platform}
📋 버전: ${systemInfo.version}
👤 사용자: ${systemInfo.userInfo.username}
🏠 호스트: ${systemInfo.hostname}
        `;
        
        alert(`${app} 속성\n${properties}`);
    }

    // 실시간 시계 업데이트
    function updateClock() {
        const clockElement = document.querySelector('.taskbar-clock');
        if (clockElement) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            clockElement.textContent = timeString;
        }
    }

    // 시계 업데이트 시작
    updateClock();
    setInterval(updateClock, 1000);

    // 시스템 정보를 콘솔에 출력 (디버깅용)
    console.log('WebOS 시스템 정보:', webOS.getSystemStatus());
}); 