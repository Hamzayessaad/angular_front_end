import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = getCookie('token');

  if (token) {
    const formattedToken = token.split(':')[1].trim();
    console.log(`${formattedToken}`);
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${formattedToken}`,
      },
      withCredentials: true, // optional depending on backend setup
    });
    return next(cloned);
  }

  return next(req);
};

// Helper to get cookie
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}
