<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class SnakeCaseConverter
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $snakeCasedRequestData = $this->convertKeysToSnakeCase($request->request->all());
        $request->request->replace($snakeCasedRequestData);

        $snakeCasedQueryData = $this->convertKeysToSnakeCase($request->query->all());
        $request->query->replace($snakeCasedQueryData);

        return $next($request);
    }

    protected function convertKeysToSnakeCase($data)
    {
        if (is_array($data)) {
            $converted = [];
            foreach ($data as $key => $value) {
                $converted[Str::snake($key)] = $this->convertKeysToSnakeCase($value);
            }
            return $converted;
        } elseif (is_object($data)) {
            $converted = new \stdClass();
            foreach (get_object_vars($data) as $key => $value) {
                $converted->{Str::snake($key)} = $this->convertKeysToSnakeCase($value);
            }
            return $converted;
        }

        return $data;
    }
}
