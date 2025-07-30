
package com.erickgcastro.domain.services;

import com.erickgcastro.domain.valueobjects.Endereco;

public interface EnderecoService {
    Endereco consultarEnderecoPorCep(String cep);
}
