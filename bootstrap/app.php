<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->api(prepend: [
            // \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);

        $middleware->alias([
            // 'verified' => \App\Http\Middleware\EnsureEmailIsVerified::class,
        ]);

        $middleware->validateCsrfTokens(except: [
            'stripe/*',
            'http://127.0.0.1:8000/api/login',
            'http://127.0.0.1:8000/login',
            'http://localhost/api/login',
            'http://localhost/login',
            'http://127.0.0.1:8000/api/register',
            'http://127.0.0.1:8000/register',
            'http://localhost/api/register',
            'http://localhost/register',
            'http://127.0.0.1:8000/api/user',
            'http://localhost/api/user',
            'http://127.0.0.1:8000/api/logout',
            'http://localhost/api/logout',
            'http://127.0.0.1:8000/logout',
            'http://localhost/logout',
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
