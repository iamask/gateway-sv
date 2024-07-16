export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      // Respond to preflight requests
      return new Response(null, {
          headers: {
              'Access-Control-Allow-Origin': 'https://r2.zxc.co.in',
              'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
              'Access-Control-Allow-Headers': 'Content-Type, x-custom-token',
              'Access-Control-Max-Age': '86400', // 24 hours
          },
      });
  }
    //console.log(new Map(request.headers));
    //check auth-sv worker
    //"auth", "calc" and "fetchpagesw" is the service binding
    const authResponse = await env.auth.fetch(request.clone());
   // console.log(authResponse.status)
    
    switch (authResponse.status) {
      case 200:
         return await env.calc.fetch(request);
      case 201:
        return await env.fetchpagesw.fetch(request);
      default:
        return authResponse
    }
  },
};


//token x-custom-token : 123
//token x-custom-token : pages
