async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const accessToken = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refresh-token');

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    let response = await fetch(`/api/v1${url}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        const errData = await response.json();
        if (errData.message === 'Invalid or expired token') {
            const refreshResponse = await fetch('/api/v1/users/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            });

            if (refreshResponse.ok) {
                const refreshData = await refreshResponse.json();
                localStorage.setItem('token', refreshData.accessToken);

                const retryHeaders = {
                    ...options.headers,
                    Authorization: `Bearer ${refreshData.accessToken}`,
                    'Content-Type': 'application/json',
                };

                response = await fetch(`/api/v1${url}`, {
                    ...options,
                    headers: retryHeaders,
                });

                return response;
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('refresh-token');
                window.location.href = '/login';
                return;
            }
        }
    }

    return response;
}

export default fetchWithAuth;