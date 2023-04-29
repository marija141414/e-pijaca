<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


/**Ovaj middleware služi za autorizaciju zahteva za pristup samo admin korisnicima. 
 * On proverava da li je korisnik autentifikovan, da li poseduje važeći token za pristup i da 
 * li ima pravo pristupa kao admin. Ako su uslovi zadovoljeni, middleware će dozvoliti nastavak obrade zahteva, u suprotnom će vratiti grešku 403 ili 401.  */
class ApiAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if(Auth::check())
        {
            if(auth()->user()->tokenCan('server:admin'))
            {
                return $next($request);
            }
            else
            {
                return response()->json([
                    'message'=>'Access denied! You are not an Admin.',
                ],403);
            }

        }
        else
        {
            return response()->json([
                'status'=>401,
                'message'=>'Please login first',
            ]);

        }

       
    }
}