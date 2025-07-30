
package com.erickgcastro.infrastructure.services;

import com.erickgcastro.domain.services.EnderecoService;
import com.erickgcastro.domain.valueobjects.Endereco;
import com.erickgcastro.infrastructure.external.ViaCepResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class ViaCepEnderecoService implements EnderecoService {
    
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;
    
    public ViaCepEnderecoService() {
        this.httpClient = HttpClient.newHttpClient();
        this.objectMapper = new ObjectMapper();
    }
    
    @Override
    public Endereco consultarEnderecoPorCep(String cep) {
        try {
            String url = "https://viacep.com.br/ws/" + cep + "/json/";
            
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .GET()
                    .build();
            
            HttpResponse<String> response = httpClient.send(request, 
                    HttpResponse.BodyHandlers.ofString());
            
            if (response.statusCode() == 200) {
                ViaCepResponse viaCepResponse = objectMapper.readValue(
                        response.body(), ViaCepResponse.class);
                
                if (viaCepResponse.getErro() == null) {
                    return new Endereco(
                            viaCepResponse.getLogradouro(),
                            viaCepResponse.getBairro(),
                            viaCepResponse.getLocalidade(),
                            viaCepResponse.getUf(),
                            viaCepResponse.getCep()
                    );
                }
            }
        } catch (IOException | InterruptedException e) {
            System.err.println("Erro ao consultar CEP: " + e.getMessage());
        }
        
        return null;
    }
}
