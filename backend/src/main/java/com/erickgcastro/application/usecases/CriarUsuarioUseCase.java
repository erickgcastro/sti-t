
package com.erickgcastro.application.usecases;

import com.erickgcastro.domain.entities.Usuario;
import com.erickgcastro.domain.repositories.UsuarioRepository;
import com.erickgcastro.domain.services.EnderecoService;
import com.erickgcastro.domain.valueobjects.Endereco;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CriarUsuarioUseCase {
    
    private final UsuarioRepository usuarioRepository;
    private final EnderecoService enderecoService;
    
    @Autowired
    public CriarUsuarioUseCase(UsuarioRepository usuarioRepository, EnderecoService enderecoService) {
        this.usuarioRepository = usuarioRepository;
        this.enderecoService = enderecoService;
    }
    
    public Usuario executar(Usuario usuario) {
        if (usuarioRepository.existsByCpf(usuario.getCpf())) {
            throw new RuntimeException("CPF já cadastrado");
        }
        
        Endereco endereco = enderecoService.consultarEnderecoPorCep(usuario.getCep());
        if (endereco != null) {
            usuario.atualizarEndereco(
                endereco.getLogradouro(),
                endereco.getBairro(),
                endereco.getCidade(),
                endereco.getUf()
            );
        }
        
        return usuarioRepository.save(usuario);
    }
}
