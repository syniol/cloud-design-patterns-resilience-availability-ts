# Health Endpoint Monitoring Pattern

This one is done using Functional Programming; just because we need services pure, declarative, and stateless.

## Create SSL Certificates

Certificates are not supplied; you need to create them using following commands in any unix based environment.

    ~$: openssl genrsa -out key.pem
    ~$: openssl req -new -key key.pem -out csr.pem
    ~$: openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
    ~$: rm csr.pem

#### Credits

Copyright &copy; 2021 Syniol Limited.
